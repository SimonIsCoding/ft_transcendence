export const twofaView = {
  render(email: string): string {
    return `
      <div class="flex flex-col justify-center items-center w-full space-y-10">
        <h2 class="text-white text-2xl font-bold mb-4">Two-Factor Authentication</h2>
        <p class="text-white mb-6">Enter verification code sent to ${email}</p>
        
        <form id="twofaForm" class="w-80">
          <input 
            type="text" 
            id="twofaCode" 
            class="text-white px-4 py-2 text-xl border border-white rounded w-full mb-4"
            maxlength="6" 
            placeholder="6-digit code"
            inputmode="numeric"
            pattern="\\d{6}"
            required
          >
          <button 
            type="submit" 
            id="verifyBtn" 
            class="text-white px-4 py-2 text-xl border border-white rounded w-full"
          >
            Verify
          </button>
        </form>
        
        <p id="twofaError" class="text-red-400 hidden mt-2"></p>
        
        <button 
          id="resendBtn" 
          class="text-white px-2 py-1 text-xl underline"
        >
          Resend Code
        </button>
      </div>
    `;
  },

  showMessage(container: HTMLElement, message: string): void {
    const el = container.querySelector('.twofa-message') as HTMLElement;
    el.textContent = message;
  },

  showError(container: HTMLElement, message: string): void {
    const el = container.querySelector('#twofaError') as HTMLElement;
    el.textContent = message;
    el.classList.remove('hidden');
  },

  clearError(container: HTMLElement): void {
    const el = container.querySelector('#twofaError') as HTMLElement;
    el.textContent = '';
    el.classList.add('hidden');
  },

  setButtonState(container: HTMLElement, isLoading: boolean): void {
    const btn = container.querySelector('#verifyBtn') as HTMLButtonElement;
    btn.disabled = isLoading;
    btn.innerHTML = isLoading 
      ? '<span class="spinner"></span> Verifying...' 
      : 'Verify';
  }
};