const crypto = require("crypto");
const HttpError = require("./httpError");

const TOKEN_TTL_SECONDS = Number(process.env.AUTH_TOKEN_TTL_SECONDS || 8 * 60 * 60);
const TOKEN_SECRET = process.env.AUTH_TOKEN_SECRET || "iam-charity-development-secret-change-me";

const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");

const sign = (value) => {
  return crypto.createHmac("sha256", TOKEN_SECRET).update(value).digest("base64url");
};

const createAuthToken = (admin) => {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    sub: String(admin.id),
    email: admin.email,
    role: admin.role,
    iat: now,
    exp: now + TOKEN_TTL_SECONDS,
  };
  const encodedPayload = encode(payload);

  return {
    token: `${encodedPayload}.${sign(encodedPayload)}`,
    expiresAt: new Date(payload.exp * 1000).toISOString(),
  };
};

const verifyAuthToken = (token) => {
  const tokenParts = String(token || "").split(".");
  if (tokenParts.length !== 2) {
    throw new HttpError(401, "Authentication required");
  }
  const [encodedPayload, providedSignature] = tokenParts;

  const expectedSignature = sign(encodedPayload);
  const providedBuffer = Buffer.from(providedSignature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (
    providedBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(providedBuffer, expectedBuffer)
  ) {
    throw new HttpError(401, "Invalid authentication token");
  }

  let payload;
  try {
    payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8"));
  } catch {
    throw new HttpError(401, "Invalid authentication token");
  }

  if (!payload.exp || payload.exp <= Math.floor(Date.now() / 1000)) {
    throw new HttpError(401, "Your session has expired. Please sign in again.");
  }

  return payload;
};

module.exports = {
  createAuthToken,
  verifyAuthToken,
};
