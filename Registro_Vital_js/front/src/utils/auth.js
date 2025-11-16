const TOKEN_KEY = "registroVitalToken";
const AUTH_EVENT = "registroVitalAuthChange";

const dispatchAuthEvent = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(AUTH_EVENT));
};

export function getAuthToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token) {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
  dispatchAuthEvent();
}

export function clearAuthToken() {
  setAuthToken(null);
}

function decodePayload(token) {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length < 2) return null;
  try {
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(base64);
    return JSON.parse(json);
  } catch (err) {
    console.warn("Falha ao decodificar token", err);
    return null;
  }
}

export function getAuthPayload() {
  if (typeof window === "undefined") return null;
  return decodePayload(getAuthToken());
}

export function onAuthChange(handler) {
  if (typeof window === "undefined") return () => {};
  const listener = () => handler(getAuthToken());
  window.addEventListener(AUTH_EVENT, listener);
  return () => window.removeEventListener(AUTH_EVENT, listener);
}
