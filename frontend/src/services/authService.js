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

  isAuthenticated: () => Boolean(authService.getSession()),

  login: ({ email, password }) => {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    const session = {
      email,
      name: email.split("@")[0] || "Admin User",
      role: "Administrator",
      loggedInAt: new Date().toISOString(),
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    return session;
  },

  logout: () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },
};

export default authService;
