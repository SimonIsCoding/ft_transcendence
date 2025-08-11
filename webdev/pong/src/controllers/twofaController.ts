import { twofaView } from '../views/twofaView';
import { Router } from '../router';

export class TwoFAController {
  private attempts = 0;
  private readonly maxAttempts = 3;
  private readonly email: string;
  private readonly flowType: 'login' | 'register';
  private readonly onSuccess: () => void;
  private readonly container: HTMLElement;
  private readonly onFailure?: (message: string, isFinal: boolean) => void;

  constructor(
    email: string,
    flowType: 'login' | 'register',
    onSuccess: () => void,
    container: HTMLElement,
    onFailure?: (message: string, isFinal: boolean) => void
  ) {
    this.email = email;
    this.flowType = flowType;
    this.onSuccess = onSuccess;
    this.container = container;
    this.onFailure = onFailure || this.defaultFailureHandler;

    console.log('2FA Controller initialized for:', email);
  }

  public init(): HTMLElement {
    console.log('Rendering 2FA template for:', this.email);
    const view = document.createElement('div');
    view.innerHTML = twofaView.render(this.email);

    // Debug template rendering
    if (!view.innerHTML.includes('twofaForm')) {
      console.error('Template rendering failed!', {
        templateOutput: twofaView.render(this.email),
        container: this.container
      });
      throw new Error('2FA template error');
    }

    this.setupEventListeners(view);
    return view;
  }

  private setupEventListeners(container: HTMLElement): void {
    const form = container.querySelector('#twofaForm') as HTMLFormElement;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const codeInput = container.querySelector('#twofaCode') as HTMLInputElement;
      await this.verifyCode(codeInput.value.trim());
    });

    const resendBtn = container.querySelector('#resendBtn') as HTMLButtonElement;
    resendBtn.addEventListener('click', () => this.resendCode());
  }

  private async verifyCode(code: string): Promise<void> {
    console.log('Verifying 2FA code:', code);
    if (!/^\d{6}$/.test(code)) {
      this.showError('Please enter a valid 6-digit code');
      return;
    }

    this.attempts++;
    console.log(`Attempt ${this.attempts}/${this.maxAttempts}`);

    try {
      const response = await fetch('/api/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: this.email,
          token: code 
        }),
        credentials: 'include' // Crucial for cookies
      });

      console.log('Verification response:', response.status, await response.text());

      if (response.ok) {
        this.onSuccess();
      } else {
        await this.handleFailedAttempt(response);
      }
    } catch (error) {
      console.error('Verification error:', error);
      await this.handleFailedAttempt();
    }
  }

  private async handleFailedAttempt(response?: Response): Promise<void> {
    const remaining = this.maxAttempts - this.attempts;
    const isFinal = remaining <= 0;
    let errorMessage = 'Verification failed';

    if (response) {
      try {
        const data = await response.json();
        errorMessage = data.message || errorMessage;
        console.log('Failure details:', data);
      } catch (e) {
        console.error('Failed to parse error response:', e);
      }
    }

    errorMessage += isFinal 
      ? '. Maximum attempts reached.' 
      : ` (${remaining} ${remaining === 1 ? 'attempt' : 'attempts'} remaining)`;

    console.log(`Attempt failed. Message: ${errorMessage}`);

    if (this.onFailure) {
      this.onFailure(errorMessage, isFinal);
    }

    if (isFinal) {
      await this.invalidateSession();
      setTimeout(() => Router.navigate(this.flowType), 3000);
    }
  }

  private async invalidateSession(): Promise<void> {
    console.log('Invalidating session...');
    await fetch('/api/auth/invalidate', {
      method: 'POST',
      credentials: 'include'
    });
  }

  private async resendCode(): Promise<void> {
    console.log('Resending 2FA code to:', this.email);
    try {
      const response = await fetch('/api/2fa/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.email }),
        credentials: 'include'
      });

      if (response.ok) {
        this.showError('New code sent successfully');
      } else {
        throw new Error('Failed to resend');
      }
    } catch (error) {
      console.error('Resend failed:', error);
      this.showError('Failed to resend code');
    }
  }

  private showError(message: string): void {
    console.log('Displaying error:', message);
    const errorEl = this.container.querySelector('#twofaError');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.remove('hidden');
    }
  }

  private defaultFailureHandler = (message: string, isFinal: boolean): void => {
    this.showError(message);
    if (isFinal) {
      const submitBtn = this.container.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.setAttribute('disabled', 'true');
    }
  };
}