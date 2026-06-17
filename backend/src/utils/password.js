const crypto = require("crypto");
const { promisify } = require("util");

const scrypt = promisify(crypto.scrypt);
const KEY_LENGTH = 64;

const hashPassword = async (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = await scrypt(password, salt, KEY_LENGTH);
  return `scrypt$${salt}$${derivedKey.toString("hex")}`;
};

const safeEqual = (left, right) => {
  const leftBuffer = Buffer.from(String(left));
  const rightBuffer = Buffer.from(String(right));
  return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer);
};

const verifyPassword = async (password, storedHash) => {
  const value = String(storedHash || "");

  if (!value.startsWith("scrypt$")) {
    return { matches: safeEqual(password, value), needsUpgrade: true };
  }

  const [, salt, expectedKey] = value.split("$");
  if (!salt || !expectedKey) return { matches: false, needsUpgrade: false };

  const derivedKey = await scrypt(password, salt, KEY_LENGTH);
  return {
    matches: safeEqual(derivedKey.toString("hex"), expectedKey),
    needsUpgrade: false,
  };
};

module.exports = {
  hashPassword,
  verifyPassword,
};
