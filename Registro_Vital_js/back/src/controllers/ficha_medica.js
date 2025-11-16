import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Helpers
const normalizeOptionalString = (v) => {
  if (v === undefined || v === null) return null;
  if (typeof v === "string") {
    const s = v.trim();
    if (s === "" || s.toLowerCase() === "null") return null;
    return s;
  }
  return String(v);
};

const toBoolean = (v, defaultValue = false) => {
  if (v === undefined || v === null) return defaultValue;
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v !== 0;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    if (["true", "1", "on", "yes", "sim"].includes(s)) return true;
    if (["false", "0", "off", "no", "nao", "não", "não"].includes(s))
      return false;
    return defaultValue;
  }
  return defaultValue;
};

const parseDateOrNull = (v) => {
  if (!v) return null;
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return null;
  return d;
};

// Create Ficha Médica
export const createFichaMedica = async (req, res) => {
  try {
    const {
      cpf,
      usuario_id,
      data_nascimento,
      altura,
      peso,
      alergia,
      alergia_medicamento,
      orgao_transplantado,
      plano_saude,
      restricao_religiosa,
      atividade_fisica,
      doenca_pre_existente,
      uso_medicamento,
      cirurgia_anteriormente,
      internacao_anteriormente,
      doenca_infecciosa_passada,
      historico_familiar_doenca,
      informacoes_pessoais_adicionais,
      bebida_alcoolica,
      tabagismo,
      alteracao_cardiaca,
      portador_marca_passo,
      ordem_nao_reanimacao,
      doador_orgaos,
      nome,
    } = req.body;

    // Validations for required fields
    if (!cpf || String(cpf).trim() === "") {
      return res.status(400).json({ error: "cpf é obrigatório" });
    }
    const usuarioIdNum = Number(usuario_id);
    if (!usuarioIdNum || Number.isNaN(usuarioIdNum)) {
      return res.status(400).json({ error: "usuario_id inválido" });
    }
    const date = parseDateOrNull(data_nascimento);
    if (!date)
      return res.status(400).json({ error: "data_nascimento inválida" });

    const alturaNum = Number(altura);
    if (Number.isNaN(alturaNum))
      return res.status(400).json({ error: "altura inválida" });
    const pesoNum = Number(peso);
    if (Number.isNaN(pesoNum))
      return res.status(400).json({ error: "peso inválido" });

    const nomeLimpo =
      typeof nome === "string" && nome.trim().length > 0 ? nome.trim() : null;

    if (nomeLimpo) {
      await prisma.usuario.update({
        where: { id: usuarioIdNum },
        data: { nome: nomeLimpo },
      });
    }

    const data = {
      cpf: String(cpf),
      usuario_id: usuarioIdNum,
      data_nascimento: date,
      altura: alturaNum,
      peso: pesoNum,
      alergia: normalizeOptionalString(alergia),
      alergia_medicamento: normalizeOptionalString(alergia_medicamento),
      orgao_transplantado: normalizeOptionalString(orgao_transplantado),
      plano_saude: normalizeOptionalString(plano_saude),
      restricao_religiosa: normalizeOptionalString(restricao_religiosa),
      atividade_fisica: normalizeOptionalString(atividade_fisica),
      doenca_pre_existente: normalizeOptionalString(doenca_pre_existente),
      uso_medicamento: normalizeOptionalString(uso_medicamento),
      cirurgia_anteriormente: normalizeOptionalString(cirurgia_anteriormente),
      internacao_anteriormente: normalizeOptionalString(
        internacao_anteriormente
      ),
      doenca_infecciosa_passada: normalizeOptionalString(
        doenca_infecciosa_passada
      ),
      historico_familiar_doenca: normalizeOptionalString(
        historico_familiar_doenca
      ),
      informacoes_pessoais_adicionais: normalizeOptionalString(
        informacoes_pessoais_adicionais
      ),
      bebida_alcoolica: toBoolean(bebida_alcoolica, false),
      tabagismo: toBoolean(tabagismo, false),
      alteracao_cardiaca: toBoolean(alteracao_cardiaca, false),
      portador_marca_passo: toBoolean(portador_marca_passo, false),
      ordem_nao_reanimacao: toBoolean(ordem_nao_reanimacao, false),
      doador_orgaos: toBoolean(doador_orgaos, false),
    };

    const ficha = await prisma.ficha_medica.create({ data });
    res.status(201).json(ficha);
  } catch (error) {
    if (error && error.code === "P2002") {
      return res.status(409).json({ error: "CPF já cadastrado" });
    }
    if (error && error.code === "P2003") {
      return res.status(400).json({ error: "usuario_id não existe" });
    }
    res
      .status(400)
      .json({ error: error.message || "Erro ao criar ficha médica" });
  }
};

// List all Fichas
export const getFichasMedicas = async (_req, res) => {
  try {
    const fichas = await prisma.ficha_medica.findMany({
      include: { usuario: true },
    });
    res.json(fichas);
  } catch (error) {
    res.status(500).json({ error: error.message || "Erro ao listar fichas" });
  }
};

// Get by ID
export const getFichaMedicaById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "id inválido" });
    const ficha = await prisma.ficha_medica.findUnique({
      where: { id },
      include: { usuario: true },
    });
    if (!ficha) return res.status(404).json({ error: "Ficha não encontrada" });
    res.json(ficha);
  } catch (error) {
    res.status(500).json({ error: error.message || "Erro ao buscar ficha" });
  }
};

export const getFichaMedicaByUsuarioId = async (req, res) => {
  try {
    const usuarioId = Number(req.params.usuarioId);
    if (!usuarioId)
      return res.status(400).json({ error: "usuario_id inválido" });
    const ficha = await prisma.ficha_medica.findFirst({
      where: { usuario_id: usuarioId },
      include: { usuario: true },
    });
    if (!ficha) return res.status(404).json({ error: "Ficha não encontrada" });
    res.json(ficha);
  } catch (error) {
    res.status(500).json({ error: error.message || "Erro ao buscar ficha" });
  }
};

// Update (partial)
export const updateFichaMedica = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "id inválido" });

    const fichaAtual = await prisma.ficha_medica.findUnique({
      where: { id },
      select: { usuario_id: true },
    });
    if (!fichaAtual)
      return res.status(404).json({ error: "Ficha não encontrada" });

    const data = {};
    const b = req.body || {};
    const usuarioIdFicha =
      Number(b.usuario_id) && !Number.isNaN(Number(b.usuario_id))
        ? Number(b.usuario_id)
        : fichaAtual.usuario_id;

    if ("nome" in b) {
      const nomeLimpo =
        typeof b.nome === "string" && b.nome.trim().length > 0
          ? b.nome.trim()
          : null;
      if (nomeLimpo) {
        await prisma.usuario.update({
          where: { id: usuarioIdFicha },
          data: { nome: nomeLimpo },
        });
      }
    }

    if ("cpf" in b) data.cpf = String(b.cpf);
    if ("usuario_id" in b) data.usuario_id = Number(b.usuario_id);
    if ("data_nascimento" in b) {
      const d = parseDateOrNull(b.data_nascimento);
      if (!d)
        return res.status(400).json({ error: "data_nascimento inválida" });
      data.data_nascimento = d;
    }
    if ("altura" in b) {
      const n = Number(b.altura);
      if (Number.isNaN(n))
        return res.status(400).json({ error: "altura inválida" });
      data.altura = n;
    }
    if ("peso" in b) {
      const n = Number(b.peso);
      if (Number.isNaN(n))
        return res.status(400).json({ error: "peso inválido" });
      data.peso = n;
    }

    const optStrFields = [
      "alergia",
      "alergia_medicamento",
      "orgao_transplantado",
      "plano_saude",
      "restricao_religiosa",
      "atividade_fisica",
      "doenca_pre_existente",
      "uso_medicamento",
      "cirurgia_anteriormente",
      "internacao_anteriormente",
      "doenca_infecciosa_passada",
      "historico_familiar_doenca",
      "informacoes_pessoais_adicionais",
    ];
    optStrFields.forEach((k) => {
      if (k in b) data[k] = normalizeOptionalString(b[k]);
    });

    const boolFields = [
      "bebida_alcoolica",
      "tabagismo",
      "alteracao_cardiaca",
      "portador_marca_passo",
      "ordem_nao_reanimacao",
      "doador_orgaos",
    ];
    boolFields.forEach((k) => {
      if (k in b) data[k] = toBoolean(b[k]);
    });

    const ficha = await prisma.ficha_medica.update({ where: { id }, data });
    res.json(ficha);
  } catch (error) {
    if (error && error.code === "P2025") {
      return res.status(404).json({ error: "Ficha não encontrada" });
    }
    if (error && error.code === "P2002") {
      return res.status(409).json({ error: "CPF já cadastrado" });
    }
    if (error && error.code === "P2003") {
      return res.status(400).json({ error: "usuario_id não existe" });
    }
    res.status(400).json({ error: error.message || "Erro ao atualizar ficha" });
  }
};

// Delete
export const deleteFichaMedica = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "id inválido" });
    await prisma.ficha_medica.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    if (error && error.code === "P2025") {
      return res.status(404).json({ error: "Ficha não encontrada" });
    }
    res.status(400).json({ error: error.message || "Erro ao excluir ficha" });
  }
};
