import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);
const SALT_BYTES = 16;
const KEY_LEN = 64;

export async function hashSenha(senha) {
  const salt = randomBytes(SALT_BYTES).toString("hex");
  const derived = await scrypt(senha, salt, KEY_LEN);
  return `${salt}:${derived.toString("hex")}`;
}

export async function compararSenha(senha, stored) {
  if (!senha || !stored) return false;
  const parts = stored.split(":");
  if (parts.length !== 2) return false;
  const [salt, key] = parts;
  const derived = await scrypt(senha, salt, KEY_LEN);
  return derived.toString("hex") === key;
}
