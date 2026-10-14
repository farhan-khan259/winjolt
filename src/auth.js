const AUTH_KEY = "winjolt-authenticated";

export function isAuthenticated() {
  return sessionStorage.getItem(AUTH_KEY) === "true";
}

export function createAuthenticatedSession() {
  sessionStorage.setItem(AUTH_KEY, "true");
}

export function clearAuthenticatedSession() {
  sessionStorage.removeItem(AUTH_KEY);
}
