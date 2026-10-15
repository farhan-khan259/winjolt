const AUTH_KEY = "winjolt-authenticated";
const ADMIN_AUTH_KEY = "winjolt-admin-authenticated";

export function isAuthenticated() {
  return sessionStorage.getItem(AUTH_KEY) === "true";
}

export function createAuthenticatedSession() {
  sessionStorage.setItem(AUTH_KEY, "true");
}

export function clearAuthenticatedSession() {
  sessionStorage.removeItem(AUTH_KEY);
}

export function isAdminAuthenticated() {
  return sessionStorage.getItem(ADMIN_AUTH_KEY) === "true";
}

export function authenticateAdmin(email, password) {
  const adminEmail = process.env.REACT_APP_ADMIN_EMAIL || "admin@winjolt.co.uk";
  const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD || "WinJoltAdmin2026!";
  const valid = email.trim().toLowerCase() === adminEmail.toLowerCase() && password === adminPassword;
  if (valid) sessionStorage.setItem(ADMIN_AUTH_KEY, "true");
  return valid;
}

export function clearAdminSession() {
  sessionStorage.removeItem(ADMIN_AUTH_KEY);
}
