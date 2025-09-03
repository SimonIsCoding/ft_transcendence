// requirements/auth-service/config.js
import { readFileSync } from 'fs';

const readSecret = (filePath) => {
  try {
    return readFileSync(filePath, 'utf8').trim();
  } catch {
    return null;
  }
};

export const config = {
	COOKIE_SECRET: readSecret(process.env.COOKIE_SECRET) || 'super_secret_key',
	JWT_SECRET: readSecret(process.env.JWT_SECRET) || 'super_secret_key'
};
