import { api } from "./services/api";

const AUTH_TOKEN_KEY = "winjolt-auth-token";
const ADMIN_TOKEN_KEY = "winjolt-admin-token";
const USER_KEY = "winjolt-user";
const ADMIN_USER_KEY = "winjolt-admin-user";

export const getAuthToken = () => sessionStorage.getItem(AUTH_TOKEN_KEY);
export const getAdminToken = () => sessionStorage.getItem(ADMIN_TOKEN_KEY);
export const isAuthenticated = () => Boolean(getAuthToken());
export const isAdminAuthenticated = () => Boolean(getAdminToken());
export const getCurrentUser = () => { try { return JSON.parse(sessionStorage.getItem(USER_KEY)); } catch { return null; } };
export const getCurrentAdmin = () => { try { return JSON.parse(sessionStorage.getItem(ADMIN_USER_KEY)); } catch { return null; } };

function storeSession(result, admin = false) {
  sessionStorage.setItem(admin ? ADMIN_TOKEN_KEY : AUTH_TOKEN_KEY, result.token);
  sessionStorage.setItem(admin ? ADMIN_USER_KEY : USER_KEY, JSON.stringify(result.user));
  window.dispatchEvent(new Event("winjolt-auth-change"));
  return result.user;
}

export async function registerCustomer(payload) {
  return storeSession(await api.post("/accounts/register", payload));
}

export async function authenticateCustomer(email, password) {
  return storeSession(await api.post("/accounts/login", { email, password }));
}

export async function authenticateAdmin(email, password, mfaCode) {
  return storeSession(await api.post("/admin/auth/login", { email, password, mfa_code: mfaCode }), true);
}

export async function requestAdminOtp(email, password) {
  return api.post("/admin/auth/otp/request", { email, password });
}

export function clearAuthenticatedSession() {
  sessionStorage.removeItem(AUTH_TOKEN_KEY); sessionStorage.removeItem(USER_KEY); window.dispatchEvent(new Event("winjolt-auth-change"));
}

export function clearAdminSession() {
  sessionStorage.removeItem(ADMIN_TOKEN_KEY); sessionStorage.removeItem(ADMIN_USER_KEY); window.dispatchEvent(new Event("winjolt-auth-change"));
}
