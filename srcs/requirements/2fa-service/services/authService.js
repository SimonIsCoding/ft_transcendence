const tokenService = require('./tokenService');
const emailService = require('./emailService');

module.exports = () => ({
  initiate2FA: async (email) => {
    const token = tokenService.generateToken();
    await tokenService.storeToken(email, token);
    const emailSent = await emailService.send2FAToken(email, token);
    
    if (!emailSent) {
      throw new Error('Failed to send 2FA email');
    }
    
    return { success: true, message: '2FA token sent to email' };
  },

  verify2FA: async (email, token) => {
    const isValid = await tokenService.verifyToken(email, token);
    
    if (!isValid) {
      return { success: false, message: 'Invalid or expired token' };
    }
    
    await tokenService.deleteToken(email);
    return { success: true, message: '2FA verification successful' };
  }
});