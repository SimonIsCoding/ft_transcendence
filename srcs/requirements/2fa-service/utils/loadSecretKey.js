import fs from 'fs';

export function getSecretFromFile(envVar, defaultValue) {
  const filePath = process.env[envVar];
  if (filePath) {
    try {
      return fs.readFileSync(filePath, 'utf8').trim();
    } catch (err) {
      // Si el archivo no existe o hay error, usa el valor por defecto
      return defaultValue;
    }
  }
  return defaultValue;
}