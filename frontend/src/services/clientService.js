const trimTrailingSlash = (value) => String(value || "").replace(/\/+$/, "");

export const API_BASE_URL = trimTrailingSlash(
  import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_BASE_URL || "http://localhost:5001"
);

export const getAssetUrl = (path) => {
  if (!path) return "";
  if (/^(https?:|data:|blob:)/.test(path)) return path;
  return `${API_BASE_URL}${String(path).startsWith("/") ? path : `/${path}`}`;
};

export const jsonHeaders = {
  "Content-Type": "application/json",
};

const getAuthToken = () => {
  try {
    return JSON.parse(localStorage.getItem("hope_homes_admin_session"))?.token || "";
  } catch {
    return "";
  }
};

export const clientRequest = async (command, payload = {}, options = {}) => {
  const isFormData = payload instanceof FormData;
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/request`, {
    method: options.method || "POST",
    headers: {
      ...(isFormData ? {} : jsonHeaders),
      request: command,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    body: isFormData ? payload : JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (response.status === 401 && command !== "login") {
    localStorage.removeItem("hope_homes_admin_session");
    window.dispatchEvent(new Event("admin-session-expired"));
  }

  if (!response.ok || data.success === false) {
    throw new Error(data.message || `Backend request failed: ${command}`);
  }

  return data.data;
};

export default clientRequest;
