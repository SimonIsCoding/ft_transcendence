// requirements/2fa-service/config.js
const fs = require('fs');
require('dotenv').config();

const readSecret = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf8').trim();
  } catch {
    return null;
  }
};

module.exports = {
  // Server
  PORT: process.env.PORT || 3003,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // 2FA
  TOKEN_EXPIRY: parseInt(process.env.TOKEN_EXPIRY) || 300, // 5 minutes
  
  // Email
  EMAIL_SERVICE: process.env.EMAIL_SERVICE || 'gmail',
  EMAIL_USER: process.env.EMAIL_USER_FILE 
    ? readSecret(process.env.EMAIL_USER_FILE)
    : process.env.EMAIL_USER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD_FILE
    ? readSecret(process.env.EMAIL_PASSWORD_FILE)
    : process.env.EMAIL_PASSWORD,
  
  // Security
  CORS_ORIGINS: process.env.CORS_ORIGINS 
    ? process.env.CORS_ORIGINS.split(',') 
    : ['http://localhost:4443'],

  //App name
  APP_NAME: process.env.APP_NAME || 'My Default App Name',

};