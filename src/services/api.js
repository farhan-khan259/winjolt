const DEFAULT_API_URL = process.env.NODE_ENV === "production"
  ? "https://winjolt-backend.onrender.com/api/v1"
  : "http://localhost:5000/api/v1";
const API_URL = (process.env.REACT_APP_API_URL || DEFAULT_API_URL).replace(/\/$/, "");

function tokenFor(path) {
  return sessionStorage.getItem(path.startsWith("/admin") ? "winjolt-admin-token" : "winjolt-auth-token");
}

async function request(path, options = {}) {
  const token = tokenFor(path);
  const multipart = typeof FormData !== "undefined" && options.body instanceof FormData;
  const headers = { Accept: "application/json", ...(options.body && !multipart ? { "Content-Type": "application/json" } : {}), ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers };
  let response;
  try { response = await fetch(`${API_URL}${path}`, { ...options, headers }); }
  catch { throw new Error("The WinJolt service is unavailable. Please try again."); }
  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json") ? await response.json() : null;
  if (!response.ok) {
    if (response.status === 401) {
      sessionStorage.removeItem(path.startsWith("/admin") ? "winjolt-admin-token" : "winjolt-auth-token");
      window.dispatchEvent(new Event("winjolt-auth-change"));
    }
    const error = new Error(payload?.error?.message || "The request could not be completed.");
    error.code = payload?.error?.code; error.details = payload?.error?.details; error.status = response.status;
    throw error;
  }
  return payload;
}

const body = (value) => JSON.stringify(value);
export const api = {
  get: (path) => request(path),
  post: (path, value, options = {}) => request(path, { method: "POST", body: body(value), ...options }),
  patch: (path, value, options = {}) => request(path, { method: "PATCH", body: body(value), ...options }),
  upload: (path, formData, options = {}) => request(path, { method: "POST", body: formData, ...options }),
  assetUrl: (id) => `${API_URL}/assets/${encodeURIComponent(id)}`,
  adminAssetObjectUrl: async (id) => {
    const token = tokenFor("/admin/assets");
    const response = await fetch(`${API_URL}/admin/assets/${encodeURIComponent(id)}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
    if (!response.ok) throw new Error("Campaign image is unavailable.");
    return URL.createObjectURL(await response.blob());
  },
  idempotencyKey: () => window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`,
};
