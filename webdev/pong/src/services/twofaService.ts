export interface TwoFAResponse {
  success: boolean;
  message?: string;
  token?: string;
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
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to send verification code');
    }
  },

  async verifyCode(email: string, code: string): Promise<TwoFAResponse> {
    const response = await fetch('/api/2fa/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, token: code }),
      credentials: 'include'
    });

    const data = await response.json();
    return response.ok ? data : { ...data, success: false };
  }
};
