import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

// Criar usuário
export const createUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const usuario = await prisma.usuario.create({
      data: { nome, email, senha },
    });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar todos os usuários
export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      include: { fichaMedica: true },
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar usuário por ID
export const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await prisma.usuario.findUnique({
      where: { id: Number(id) },
      include: { fichaMedica: true },
    });
    if (!usuario)
      return res.status(404).json({ error: "Usuário não encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar usuário
export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
    const usuario = await prisma.usuario.update({
      where: { id: Number(id) },
      data: { nome, email, senha },
    });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Deletar usuário
export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.usuario.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
