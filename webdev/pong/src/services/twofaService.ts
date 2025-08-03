interface TwoFAResult {
  success: boolean;
  message: string;
  token?: string;
}

export const twoFAService = {
  async requestCode(email: string): Promise<void> {
    try {
      const response = await fetch('/api/2fa/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        credentials: 'include'
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Failed to request 2FA code');
      }
    } catch (error) {
      console.error('2FA Request Error:', error);
      throw new Error('Network error while requesting 2FA code');
    }
  },

  async verifyCode(email: string, code: string): Promise<TwoFAResult> {
    try {
      const response = await fetch('/api/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token: code }),
        credentials: 'include'
      });

      const data = await response.json();
      
      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Verification failed'
        };
      }

      return {
        success: true,
        message: data.message || '2FA verification successful',
        token: data.token
      };
    } catch (error) {
      console.error('2FA Verification Error:', error);
      return {
        success: false,
        message: 'Network error during verification'
      };
    }
  }
};