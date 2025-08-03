interface TwoFAResult {
  success: boolean;
  message: string;
}

export const twoFAService = {
  async requestCode(email: string): Promise<void> {
    const response = await fetch('/api/2fa/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error('Failed to request 2FA code');
    }
  },

  async verifyCode(email: string, code: string): Promise<TwoFAResult>  {
    const response = await fetch('/api/2fa/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
      credentials: 'include'
    });

    // Handle 401 Unauthorized (invalid token) specifically
    if (response.status === 401) {
      return {
        success: false,
        message: 'Invalid or expired token'
      };
    }

    // Handle other error statuses
    if (!response.ok) {
      throw new Error(`Verification failed: ${response.statusText}`);
    }

    // Successful verification
    return {
      success: true,
      message: '2FA verification successful'
    };
  }
};