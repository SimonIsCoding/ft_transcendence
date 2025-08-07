import { generateToken, storeToken, verifyToken, deleteToken } from './tokenService.js';
import { send2FAToken } from './emailService.js';

export const initiate2FA = async (email) => {
  const token = generateToken();
  await storeToken(email, token);
  const emailSent = await send2FAToken(email, token);
  
  if (!emailSent) {
    throw new Error('Failed to send 2FA email');
  }
  
  return { success: true, message: '2FA token sent to email' };
};

export const verify2FA = async (email, token) => {
  const isValid = await verifyToken(email, token);
  
  if (!isValid) {
    return { success: false, message: 'Invalid or expired token' };
  }
  
  await deleteToken(email);
  return { success: true, message: '2FA verification successful' };
};

export const resend2FA = async (email) => {
  // Always generate new token for security
  const newToken = generateToken();
  
  // Invalidate any existing token and store new one
  await deleteToken(email); // Cleanup old token first
  await storeToken(email, newToken);
  
  // Send the new token
  const emailSent = await send2FAToken(email, newToken);
  
  if (!emailSent) {
    throw new Error('Failed to resend 2FA email');
  }
  
  return { 
    success: true, 
    message: 'New 2FA token has been sent to your email'
  };
};