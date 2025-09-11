import { Router } from '../router';
import { setupPasswordToggle } from '../utils/utils';
import { initRegistration } from '../services/registrationService';
import { handleSidebar } from './sidebar/sidebarBehavior.ts';
// import { isValidEmail } from '../utils/utils.ts';
// import { showErrorPopup } from '../utils/utils';

export const registerView = {
  render: (): string => `

    <main id="registerArea" class="flex-1 bg-black flex items-center justify-center bg-[url('/pongBackgroundPlay.png')] bg-no-repeat bg-cover bg-center w-full h-full">
      <div id="registerForm" class="flex flex-col justify-center items-center w-full space-y-7">
        <div class="relative">
          <input id="newUsername" placeholder="Username" class="w-80 inline-block text-white font-bold text-lg border border-[#fbd11b] rounded-lg p-2.75"/>
        </div>
        <input id="newMail" placeholder="Mail" type="email" class="w-80 inline-block text-white font-bold text-lg border border-[#fbd11b] rounded-lg p-2.75"/>
        <div class="relative">
	    <input id="newPassword" placeholder="Password" type="password" class="w-80 inline-block text-white font-bold text-lg border border-[#fbd11b] rounded-lg p-2.75 pr-10"/>
	    <button id="togglePassword" type="button" class="absolute right-2 top-1/2 transform -translate-y-1/2">
	      <!-- Closed Eye -->
	      <svg id="eyeIconClosed" fill="#fbd11b" viewBox="0 0 16 16" width="21" height="21">
	        <path d="M14.53 2.53a.75.75 0 0 0-1.06-1.06l-2.163 2.162A8.9 8.9 0 0 0 8 3C4.15 3 1.513 5.398.276 7.143a1.47 1.47 0 0 0 0 1.714 10.4 10.4 0 0 0 3.004 2.802l-1.81 1.81a.75.75 0 1 0 1.06 1.061zM4.386 10.553a8.8 8.8 0 0 1-2.838-2.552V8s0-.003.003-.007C2.632 6.467 4.857 4.5 8 4.5c.764 0 1.473.116 2.126.314L8.788 6.15A2.1 2.1 0 0 0 8 6c-1.14 0-2.063.895-2.063 2 0 .293.065.57.181.821zm2.928 1.194a.87.87 0 0 1 .625-.247H8c3.143 0 5.367-1.967 6.449-3.492q.004-.006.003-.007V8s0-.003-.003-.007a8.7 8.7 0 0 0-1.014-1.181c-.321-.314-.351-.834-.034-1.151a.717.717 0 0 1 1-.031 10.3 10.3 0 0 1 1.323 1.514 1.47 1.47 0 0 1 0 1.714C14.487 10.602 11.85 13 8 13q-.127 0-.25-.003c-.653-.018-.898-.789-.436-1.25"></path>
	      </svg>
	      <!-- Open Eye -->
	      <svg id="eyeIconOpened" class="hidden" fill="#fbd11b" viewBox="0 0 24 24" width="24" height="24">
	        <path d="M12 5c-7.633 0-11 7-11 7s3.367 7 11 7 11-7 11-7-3.367-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
	      </svg>
	    </button>
	  </div>
	  <div class="relative">
	    <input id="confirmPassword" placeholder="Confirm Password" type="password" class="w-80 inline-block text-white font-bold text-lg border border-[#fbd11b] rounded-lg p-2.75 pr-10"/>
	    <button id="toggleConfirmPassword" type="button" class="absolute right-2 top-1/2 transform -translate-y-1/2">
	      <!-- Closed Eye -->
	      <svg id="confirmEyeIconClosed" fill="#fbd11b" viewBox="0 0 16 16" width="21" height="21">
	        <path d="M14.53 2.53a.75.75 0 0 0-1.06-1.06l-2.163 2.162A8.9 8.9 0 0 0 8 3C4.15 3 1.513 5.398.276 7.143a1.47 1.47 0 0 0 0 1.714 10.4 10.4 0 0 0 3.004 2.802l-1.81 1.81a.75.75 0 1 0 1.06 1.061zM4.386 10.553a8.8 8.8 0 0 1-2.838-2.552V8s0-.003.003-.007C2.632 6.467 4.857 4.5 8 4.5c.764 0 1.473.116 2.126.314L8.788 6.15A2.1 2.1 0 0 0 8 6c-1.14 0-2.063.895-2.063 2 0 .293.065.57.181.821zm2.928 1.194a.87.87 0 0 1 .625-.247H8c3.143 0 5.367-1.967 6.449-3.492q.004-.006.003-.007V8s0-.003-.003-.007a8.7 8.7 0 0 0-1.014-1.181c-.321-.314-.351-.834-.034-1.151a.717.717 0 0 1 1-.031 10.3 10.3 0 0 1 1.323 1.514 1.47 1.47 0 0 1 0 1.714C14.487 10.602 11.85 13 8 13q-.127 0-.25-.003c-.653-.018-.898-.789-.436-1.25"></path>
	      </svg>
	      <!-- Open Eye -->
	      <svg id="confirmEyeIconOpened" class="hidden" fill="#fbd11b" viewBox="0 0 24 24" width="24" height="24">
	        <path d="M12 5c-7.633 0-11 7-11 7s3.367 7 11 7 11-7 11-7-3.367-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
	      </svg>
	    </button>
	  </div>
	  
	  <div class="text-white text-center text-sm">
		<label class="font-bold">
			<input id="anonymizedCheckbox" type="checkbox" />
			Would you like to not share your data ?
		</label><br>
		<button id="showPoliciesBtn" class="underline">See data policies</button>
	  </div>
        <button id="createAccountBtn" class="w-80 inline-block text-white font-bold text-lg border border-[#fbd11b] rounded-lg p-2.75">Create Account</button>
        <button id="backToLogin" class="text-white px-2 py-1 text-xl underline">Click here to go back to log in</button>
      </div>
        <!-- Hidden 2FA container -->
 	  <div id="twofa-container" class="hidden flex-col justify-center items-center w-full space-y-10"><!-- Will be populated by TwoFAController --></div>
    </main>
  `,

  async init(): Promise<void>
  {
	await handleSidebar();

    setupPasswordToggle("newPassword", "togglePassword", "eyeIconClosed", "eyeIconOpened");
    setupPasswordToggle("confirmPassword", "toggleConfirmPassword", "confirmEyeIconClosed", "confirmEyeIconOpened");

    initRegistration();
	document.body.insertAdjacentHTML('beforeend', policiesRelatedRender());
	showPolicies();

    const backToLogin = document.getElementById('backToLogin') as HTMLButtonElement | null;
    backToLogin!.addEventListener('click', () => { Router.navigate('login'); });
  }
};

function policiesRelatedRender()
{
	return `
	<div id="policiesPopup" class="hidden bg-[url('/pongBackgroundPlay.png')] bg-no-repeat bg-cover bg-center fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
		<div class="bg-white rounded-lg shadow-lg p-6 w-3/4 h-3/4 relative overflow-y-auto">
			<button id="closePoliciesBtn" class="absolute top-1 right-3 text-gray-500 hover:text-black text-2xl font-bold">&times;</button>
			<h2 class="text-xl font-bold mb-4 text-center">Our Data Sharing Policy</h2>
			<p class="text-gray-700 mb-4">
				We value your privacy. Here is how we collect, use, and store your data:
			</p>
			<ul class="list-disc pl-6 text-gray-700 space-y-2">
				<li>We do not sell your personal data.</li>
				<li>By sharing your data, you agree to be in the list of potential users to be friends with other. You will appear in 'Other Users' list. Once being friend with another user, your mail address will be shared with your friend reciprocatively.</li>
				<li>You may opt-out of data sharing at any time.</li>
			</ul>
		</div>
	</div>
	`
}

function showPolicies()
{
	const popup = document.getElementById("policiesPopup") as HTMLDivElement;
	const showBtn = document.getElementById("showPoliciesBtn") as HTMLButtonElement;
	const closeBtn = document.getElementById("closePoliciesBtn") as HTMLButtonElement;

	if (!popup || !showBtn || !closeBtn) return;

	showBtn.addEventListener("click", () => popup.classList.remove("hidden"));
	closeBtn.addEventListener("click", () => popup.classList.add("hidden"));
	popup.addEventListener("click", (event) => {
		if (event.target === popup) popup.classList.add("hidden");
	});
}

