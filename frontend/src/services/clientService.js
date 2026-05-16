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

export const clientRequest = async (command, payload = {}, options = {}) => {
  const isFormData = payload instanceof FormData;
  const response = await fetch(API_BASE_URL, {
    method: options.method || "POST",
    headers: {
      ...(isFormData ? {} : jsonHeaders),
      request: command,
      ...options.headers,
    },
    body: isFormData ? payload : JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    throw new Error(data.message || `Backend request failed: ${command}`);
  }

  return data.data;
};

export default clientRequest;
