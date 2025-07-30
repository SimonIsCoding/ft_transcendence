import { twofaView } from '../views/twofaView';
import { twoFAService } from '../services/twofaService';
import { Router } from '../router';

let resendTimer: number;
let currentEmail: string;

export function initTwoFAController(email: string): HTMLElement { 
  currentEmail = email;  // Store email instead of login
  const container = document.createElement('div');
  container.innerHTML = twofaView.createTwoFAView(email);
  setupEventListeners(container);
  startTwoFAFlow();
  return container;
}

function setupEventListeners(container: HTMLElement): void {
  const form = container.querySelector('#twofaForm') as HTMLFormElement;
  form.addEventListener('submit', handleFormSubmit);

  const resendBtn = container.querySelector('#resendBtn') as HTMLButtonElement;
  resendBtn.addEventListener('click', handleResendCode);
}

async function startTwoFAFlow(): Promise<void> {
  twofaView.updateTwoFAMessage("Sending verification code...");
  twofaView.setResendButtonState(false, 60);
  startResendTimer(60);
  
  try {
    await twoFAService.requestCode(currentEmail);
    twofaView.updateTwoFAMessage(`Code sent to ${currentEmail}`);
  } catch (error) {
    twofaView.updateTwoFAMessage("Failed to send code. Please try again.", true);
    console.error("2FA request error:", error);
  }
}

async function handleFormSubmit(e: Event): Promise<void> {
  e.preventDefault();
  twofaView.clearTwoFAError();
  
  const codeInput = document.getElementById('twofaCode') as HTMLInputElement;
  const code = codeInput.value.trim();

  if (!code || code.length !== 6) {
    twofaView.showTwoFAError("Please enter a valid 6-digit code");
    return;
  }

  twofaView.setVerifyButtonState(true);
  
  try {
    const result = await twoFAService.verifyCode(currentEmail, code);
    if (result.success) {
      Router.navigate('userLogged');
    } else {
      twofaView.showTwoFAError(result.message || "Invalid verification code");
    }
  } catch (error) {
    twofaView.showTwoFAError("Verification failed. Please try again.");
    console.error("2FA verification error:", error);
  } finally {
    twofaView.setVerifyButtonState(false);
  }
}

async function handleResendCode(): Promise<void> {
  twofaView.setResendButtonState(false, 60);
  startResendTimer(60);
  twofaView.clearTwoFAError();
  
  try {
    await twoFAService.requestCode(currentEmail);
    twofaView.updateTwoFAMessage(`New code sent to ${currentEmail}`);
  } catch (error) {
    twofaView.updateTwoFAMessage("Failed to resend code", true);
    console.error("2FA resend error:", error);
  }
}

function startResendTimer(seconds: number): void {
  if (resendTimer) clearInterval(resendTimer);
  
  let remaining = seconds;
  twofaView.setResendButtonState(false, remaining);
  
  resendTimer = window.setInterval(() => {
    remaining--;
    twofaView.setResendButtonState(false, remaining);
    
    if (remaining <= 0) {
      clearInterval(resendTimer);
      twofaView.setResendButtonState(true);
    }
  }, 1000);
}