import bcrypt from "bcryptjs";

export async function hashSenha(senha) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(senha, salt);
}

export async function compararSenha(senha, hash) {
  if (!senha || !hash) return false;
  return await bcrypt.compare(senha, hash);
}
