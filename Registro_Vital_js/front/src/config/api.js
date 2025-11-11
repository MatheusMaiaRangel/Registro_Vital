// Centraliza a URL base da API
// Em desenvolvimento use localhost; em produção altere para sua URL real.
// Ex: export const API_URL = 'https://api.registrovital.com';
export const API_URL = "http://localhost:3000";

// Helper para requisições JSON padrão
export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  if (!res.ok) {
    throw new Error(
      (data && (data.error || data.erro)) || "Erro na requisição"
    );
  }
  return data;
}
