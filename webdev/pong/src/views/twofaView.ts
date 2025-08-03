export const twofaView = {
  createTwoFAView(email: string): string {
    return `
      <div class="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold text-white mb-4">Two-Factor Authentication</h2>
        <p class="text-gray-300 mb-6 twofa-message">We've sent a verification code to ${email}</p>
        
        <form id="twofaForm">
          <div class="mb-4">
            <input 
              type="text" 
              id="twofaCode" 
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-center tracking-widest"
              placeholder="Enter 6-digit code"
              maxlength="6"
              inputmode="numeric"
            >
            <p id="twofaError" class="text-red-400 mt-2 text-sm hidden"></p>
          </div>
          
          <button 
            type="submit" 
            id="verifyBtn"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Verify Code
          </button>
        </form>
        
        <div class="mt-4 text-center">
          <button 
            id="resendBtn"
            class="text-blue-400 hover:text-blue-300 disabled:opacity-50"
            disabled
          >
            Resend Code
          </button>
          <p id="resendTimer" class="text-gray-400 text-sm mt-1 hidden">Resend available in <span>60</span>s</p>
        </div>
      </div>
    `;
  },

  updateTwoFAMessage(message: string, isError = false): void {
    const messageEl = document.querySelector('.twofa-message');
    if (messageEl) {
      messageEl.textContent = message;
      messageEl.className = isError 
        ? 'text-red-400 mb-6 twofa-message' 
        : 'text-gray-300 mb-6 twofa-message';
    }
  },

  showTwoFAError(message: string): void {
    const errorEl = document.getElementById('twofaError');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.remove('hidden');
    }
  },

  clearTwoFAError(): void {
    const errorEl = document.getElementById('twofaError');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.add('hidden');
    }
  },

  setVerifyButtonState(isLoading: boolean): void {
    const button = document.getElementById('verifyBtn') as HTMLButtonElement | null;
    if (button) {
      button.innerHTML = isLoading
        ? `<span class="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span> Verifying...`
        : 'Verify Code';
      button.disabled = isLoading;
    }
  },

  setResendButtonState(canResend: boolean, countdown?: number): void {
    const button = document.getElementById('resendBtn') as HTMLButtonElement | null;
    const timerEl = document.getElementById('resendTimer');
    
    if (button) {
      button.disabled = !canResend;
      
      if (timerEl && countdown !== undefined) {
        timerEl.classList.remove('hidden');
        const countdownSpan = timerEl.querySelector('span');
        if (countdownSpan) {
          countdownSpan.textContent = countdown.toString();
        }
      } else if (timerEl) {
        timerEl.classList.add('hidden');
      }
    }
  }
};