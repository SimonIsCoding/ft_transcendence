import { generateToken, storeToken, verifyToken, deleteToken } from './tokenService.js';
import { send2FAToken } from './emailService.js';

export const initiate2FA = async (email) => {
  const token = generateToken();
  await storeToken(email, token);
  const emailSent = await send2FAToken(email, token);
  
  if (!emailSent) {
    throw new Error('Failed to send 2FA email');
  }
  
  const response = { success: true, message: '2FA token sent to email' };

  // Only return the token if set SHOW_2FA
  if (process.env.SHOW_2FA === 'true') {
    response.sentToken = token;
  }

  return response;

};

export const verify2FA = async (email, token) => {
  const isValid = await verifyToken(email, token);
  
  if (!isValid) {
    return { success: false, message: 'Invalid or expired token' };
  }
  
  await deleteToken(email);
  return { success: true, message: '2FA verification successful' };
};

