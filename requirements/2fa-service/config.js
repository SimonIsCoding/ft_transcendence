// requirements/2fa-service/config.js
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const readSecret = (filePath) => {
  try {
    return readFileSync(filePath, 'utf8').trim();
  } catch {
    return null;
  }
};

// Named exports (recommended)
export const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT) || 3003,
  EMAIL_SERVICE: process.env.EMAIL_SERVICE || 'gmail',
  EMAIL_USER: process.env.EMAIL_USER_FILE 
    ? readSecret(process.env.EMAIL_USER_FILE)
    : process.env.EMAIL_USER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD_FILE
    ? readSecret(process.env.EMAIL_PASSWORD_FILE)
    : process.env.EMAIL_PASSWORD,
  APP_NAME: process.env.APP_NAME || '2FA Service',
  COOKIE_SECRET: readSecret(process.env.COOKIE_SECRET) || 'super_secret_key',
  JWT_SECRET: readSecret(process.env.JWT_SECRET) || 'super_secret_key',
  CORS_ORIGINS: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000']
};

// Or if you prefer default export:
// export default { ...config };
