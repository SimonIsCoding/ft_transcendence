export const twofaView = {
  render(email: string): string {
    return `
      <div class="twofa-container">
        <h2>Two-Factor Authentication</h2>
        <p class="twofa-message">Enter verification code sent to ${email}</p>
        <form id="twofaForm" class="twofa-form">
          <input type="text" id="twofaCode" 
                 class="twofa-input" 
                 maxlength="6" 
                 placeholder="6-digit code"
                 inputmode="numeric"
                 pattern="\\d{6}"
                 required>
          <button type="submit" id="verifyBtn" class="twofa-button">Verify</button>
        </form>
        <p id="twofaError" class="twofa-error hidden"></p>
        <button id="resendBtn" class="twofa-resend">Resend Code</button>
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