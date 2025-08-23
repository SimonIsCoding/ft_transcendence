import fs from 'fs';

export function loadSecretKey(envVarName)
{
  const secretFile = process.env[envVarName];
  
  if (secretFile && fs.existsSync(secretFile))
    return fs.readFileSync(secretFile, 'utf8').trim();
  
  throw new Error(`Secret file for ${envVarName} not found`);
}
