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

export function onAuthChange(handler) {
  if (typeof window === "undefined") return () => {};
  const listener = () => handler(getAuthToken());
  window.addEventListener(AUTH_EVENT, listener);
  return () => window.removeEventListener(AUTH_EVENT, listener);
}
