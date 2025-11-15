import { prisma } from "../configs/prisma.js";

import jwt from "jsonwebtoken";
import { compararSenha, hashSenha } from "../utils/argon2.js";
import { sendMail, isMailerConfigured } from "../utils/mailer.js";
import path from "path";
import dotenv from "dotenv";

const envPaths = [
  path.join(process.cwd(), ".env"),
  path.join(process.cwd(), "prisma", ".env"),
];
for (const envPath of envPaths) {
  dotenv.config({ path: envPath, override: false });
}

class TokenController {
  constructor() {
    this.RESET_TOKEN_EXPIRATION = process.env.RESET_TOKEN_EXPIRES || "1h";
    this.FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL || "http://localhost:5173";
    this.RESET_REQUEST_LIMIT = parseInt(process.env.RESET_REQUEST_LIMIT || "3", 10);
    this.RESET_REQUEST_WINDOW_MINUTES = parseInt(
      process.env.RESET_REQUEST_WINDOW_MINUTES || "60",
      10
    );
    this.resetRequestTracker = new Map();
  }

  gerarToken(payload) {
    return jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRES || "7d",
    });
  }

  isRateLimited(email) {
    if (!email) return false;
    const now = Date.now();
    const windowMs = this.RESET_REQUEST_WINDOW_MINUTES * 60 * 1000;
    const timestamps = this.resetRequestTracker.get(email) || [];
    const recent = timestamps.filter((ts) => now - ts < windowMs);

    if (recent.length >= this.RESET_REQUEST_LIMIT) {
      this.resetRequestTracker.set(email, recent);
      return true;
    }

    recent.push(now);
    this.resetRequestTracker.set(email, recent);
    return false;
  }

  // Login e geração de token
  async login(req, res) {
    try {
      const { email = "", senha = "" } = req.body || {};

      if (!email || !senha) {
        return res.status(400).json({ error: "Email e senha são obrigatórios" });
      }

      const usuario = await prisma.usuario.findUnique({ where: { email } });
      if (!usuario) return res.status(401).json({ error: "Credenciais inválidas" });

      if (usuario.isDeleted) {
        return res.status(403).json({ error: "Conta desativada. Contate o administrador." });
      }

      const senhaValida = await compararSenha(senha, usuario.senha);
      if (!senhaValida) return res.status(401).json({ error: "Credenciais inválidas" });

      const token = this.gerarToken({ id: usuario.id, nome: usuario.nome, email: usuario.email });
      return res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno ao gerar token" });
    }
  }

  async requestPasswordReset(req, res) {
    const { email = "" } = req.body || {};
    if (!email) return res.status(400).json({ error: "Informe o email" });

    try {
      const usuario = await prisma.usuario.findUnique({ where: { email } });
      if (!usuario || usuario.isDeleted) {
        return res.status(200).json({ message: "Se o email existir, enviaremos instruções." });
      }

      if (this.isRateLimited(email)) {
        return res.status(429).json({ error: "Muitas solicitações de redefinição. Tente novamente mais tarde." });
      }

      if (!isMailerConfigured()) {
        return res.status(503).json({ error: "Serviço de e-mail indisponível" });
      }

      const resetToken = jwt.sign({ type: "password-reset", id: usuario.id, email: usuario.email }, process.env.TOKEN_SECRET, { expiresIn: this.RESET_TOKEN_EXPIRATION });

      const resetUrl = new URL("/esqueceu-senha", this.FRONTEND_BASE_URL);
      resetUrl.searchParams.set("token", resetToken);

      const html = `
        <p>Olá, ${usuario.nome || ""}!</p>
        <p>Recebemos um pedido para redefinir sua senha. Clique no botão abaixo para continuar:</p>
        <p><a href="${resetUrl.toString()}" style="display:inline-block;padding:12px 16px;background:#1C4F9C;color:#fff;border-radius:6px;text-decoration:none">Redefinir senha</a></p>
        <p>Se você não solicitou essa alteração, ignore este e-mail.</p>
        <p>Este link expira em ${this.RESET_TOKEN_EXPIRATION}.</p>
      `;

      await sendMail({ to: usuario.email, subject: "Redefinição de senha", html });

      return res.status(200).json({ message: "Se o email existir, enviaremos instruções." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao processar solicitação de redefinição" });
    }
  }

  async verifyResetToken(req, res) {
    const { token } = req.body || {};
    if (!token) return res.status(400).json({ error: "Token obrigatório" });

    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      if (decoded.type !== "password-reset") return res.status(400).json({ error: "Token inválido" });
      return res.status(200).json({ ok: true, email: decoded.email });
    } catch (error) {
      return res.status(400).json({ error: "Token expirado ou inválido" });
    }
  }

  async resetPassword(req, res) {
    const { token, senha } = req.body || {};
    if (!token || !senha) return res.status(400).json({ error: "Token e nova senha são obrigatórios" });

    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      if (decoded.type !== "password-reset") return res.status(400).json({ error: "Token inválido" });

      const usuario = await prisma.usuario.findUnique({ where: { id: decoded.id } });
      if (!usuario || usuario.isDeleted) return res.status(404).json({ error: "Usuário não encontrado" });

      const novaSenhaHash = await hashSenha(senha);
      await prisma.usuario.update({ where: { id: usuario.id }, data: { senha: novaSenhaHash } });

      return res.status(200).json({ message: "Senha atualizada com sucesso" });
    } catch (error) {
      console.error(error);
      if (error.name === "TokenExpiredError") return res.status(400).json({ error: "Token expirado" });
      return res.status(400).json({ error: "Token inválido" });
    }
  }
}

const tokenController = new TokenController();

export default tokenController;