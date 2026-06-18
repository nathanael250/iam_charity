import { clientRequest } from "./clientService";

const AUTH_STORAGE_KEY = "hope_homes_admin_session";

export const authService = {
  getSession: () => {
    const storedSession = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!storedSession) return null;

    try {
      return JSON.parse(storedSession);
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }
  },

  isAuthenticated: () => {
    const session = authService.getSession();
    const expiresAt = new Date(session?.expiresAt).getTime();
    if (!session?.token || !Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
      if (session) localStorage.removeItem(AUTH_STORAGE_KEY);
      return false;
    }
    return true;
  },

  login: async ({ email, password }) => {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    const session = await clientRequest("login", { email: email.trim(), password });

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    return session;
  },

  updateSessionUser: (user) => {
    const session = authService.getSession();
    if (!session) return null;

    const nextSession = {
      ...session,
      user: {
        ...(session.user || {}),
        ...user,
      },
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextSession));
    return nextSession;
  },

  logout: () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },
};

export default authService;
