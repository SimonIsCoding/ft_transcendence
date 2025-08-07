import { twofaView } from '../views/twofaView';
import { Router } from '../router';

export class TwoFAController {
  private attempts = 0;
  private readonly maxAttempts = 3;
  private readonly email: string;
  private readonly flowType: 'login' | 'register';
  private readonly authToken: string;
  private readonly onSuccess: () => void;
  private readonly container: HTMLElement;
  private readonly onFailure?: (message: string, isFinal: boolean) => void;

  constructor(
    email: string,
    flowType: 'login' | 'register',
    authToken: string,
    onSuccess: () => void,
    container: HTMLElement,
    onFailure?: (message: string, isFinal: boolean) => void
   ) {
    this.email = email;
    this.flowType = flowType;
    this.authToken = authToken;
    this.onSuccess = onSuccess;
    this.container = container;
    this.onFailure = onFailure || this.defaultFailureHandler;
  }

  public init(): HTMLElement {
    // Use twofaView.render() instead of local render method
    const view = document.createElement('div');
    view.innerHTML = twofaView.render(this.email);
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
    if (!/^\d{6}$/.test(code)) {
      this.showError('Please enter a valid 6-digit code');
      return;
    }

    this.attempts++;

    try {
      const response = await fetch('/api/2fa/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authToken}`
        },
        body: JSON.stringify({ code })
      });

      if (response.ok) {
        this.onSuccess();
      } else {
        await this.handleFailedAttempt(response);
      }
    } catch (error) {
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
      } catch (_) {}
    }

    errorMessage += isFinal 
      ? '. Maximum attempts reached.' 
      : ` (${remaining} ${remaining === 1 ? 'attempt' : 'attempts'} remaining)`;

    if (this.onFailure) {
      this.onFailure(errorMessage, isFinal);
    }

    if (isFinal) {
      await this.invalidateSession();
      setTimeout(() => Router.navigate(this.flowType), 3000);
    }
  }

  private async invalidateSession(): Promise<void> {
    await fetch('/api/auth/invalidate', {
      credentials: 'include'
    });
  }

  private async resendCode(): Promise<void> {
    try {
      await fetch('/api/2fa/resend', {
        headers: {
          'Authorization': `Bearer ${this.authToken}`
        }
      });
      this.showError('New code sent successfully');
    } catch (error) {
      this.showError('Failed to resend code');
    }
  }

  private showError(message: string): void {
    const errorEl = this.container.querySelector('#twofaError');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.remove('hidden');
    }
  }

  private defaultFailureHandler = (message: string, isFinal: boolean): void => {
    this.showError(message);
    if (isFinal) {
      this.container.querySelector('button[type="submit"]')?.setAttribute('disabled', 'true');
    }
  };
}