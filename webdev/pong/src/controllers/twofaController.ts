import { twofaView } from '../views/twofaView';
import { twoFAService } from '../services/twofaService';
import type { TwoFAResponse } from '../services/twofaService';

export class TwoFAController {
  private attempts = 0;
  private readonly maxAttempts = 3;
  private readonly email: string;
//   private readonly flowType: 'login' | 'register' | 'sidebar';
  private readonly onSuccess: () => void;
  private container: HTMLElement;
  private readonly onFailure?: (message: string, isFinal: boolean) => void;
  private viewRender: typeof twofaView;


  constructor(
    email: string,
    // flowType: 'login' | 'register' | 'sidebar',
    onSuccess: () => void,
    container: HTMLElement,
    onFailure: (message: string, isFinal: boolean) => void,
	viewRender?: typeof twofaView  // <-- add this

  ) {
    this.email = email;
    // this.flowType = flowType;
    this.onSuccess = onSuccess;
    this.container = container;
    this.onFailure = onFailure;
    this.viewRender = viewRender || twofaView; // default to main login view

  }

  public init(): HTMLElement {
    const view = document.createElement('div');
    view.innerHTML = this.viewRender.render(this.email);

    // Debug template rendering
    if (!view.innerHTML.includes('twofaForm')) {
      console.error('Template rendering failed!', {
        templateOutput: this.viewRender.render(this.email),
        container: this.container
      });
      throw new Error('2FA template error');
    }

    this.container = view;

    this.setupEventListeners(view);
  // Request the first 2FA code via the service
    this.sendInitialCode();
    return view;
  }

private async sendInitialCode(): Promise<void> {
  try {
    await twoFAService.requestCode(this.email);
  } catch (error) {
    this.showError('Could not send verification code');
  }
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
  const result = await twoFAService.verifyCode(this.email, code);


  if (result.success) {
    this.onSuccess();
  } else {
    await this.handleFailedAttempt(result);
  }
} catch (error) {
  console.error('Verification error:', error);
  await this.handleFailedAttempt();
}
  }

  private async handleFailedAttempt(response?: TwoFAResponse): Promise<void> {
    const remaining = this.maxAttempts - this.attempts;
    const isFinal = remaining <= 0;
    let errorMessage = 'Verification failed';

    if (response) {
      try {
        errorMessage = response.message || errorMessage;
      } catch (e) {
        console.error('Failed to parse error response:', e);
      }
    }

    errorMessage += isFinal 
      ? '. Maximum attempts reached.' 
      : ` (${remaining} ${remaining === 1 ? 'attempt' : 'attempts'} remaining)`;

    this.showError(`Attempt failed. Message: ${errorMessage}`);

    if (this.onFailure) {
      this.onFailure(errorMessage, isFinal);
    }
}
  
private async resendCode(): Promise<void> {
  try {
    await twoFAService.requestCode(this.email);
    this.showError('New code sent successfully');
  } catch (error) {
    console.error('Resend failed:', error);
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

}
