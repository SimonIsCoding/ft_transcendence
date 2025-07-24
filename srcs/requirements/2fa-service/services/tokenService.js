// requirements/2fa-service/services/tokenService.js
import db from './dbService.js';
import otpGenerator from 'otp-generator';

export const generateToken = () => {
  return otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false
  });
};

export const storeToken = async (email, token) => {
  const expiry = parseInt(process.env.TOKEN_EXPIRY) || 300;
  const expiresAt = Math.floor(Date.now() / 1000) + expiry;
  
  db.prepare(`
    INSERT OR REPLACE INTO tokens (email, token, expires_at)
    VALUES (?, ?, ?)
  `).run(email, token, expiresAt);
};

export const verifyToken = async (email, token) => {
  const row = db.prepare(`
    SELECT token FROM tokens 
    WHERE email = ? AND expires_at > ?
  `).get(email, Math.floor(Date.now() / 1000));
  
  return row ? row.token === token : false;
};

export const deleteToken = async (email) => {
  db.prepare('DELETE FROM tokens WHERE email = ?').run(email);
};

// Alternative if you prefer default export:
// export default { generateToken, storeToken, verifyToken, deleteToken };

