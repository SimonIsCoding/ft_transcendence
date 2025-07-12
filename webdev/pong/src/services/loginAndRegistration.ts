// --- form to log in
export function initLogin()
{
	const submitBtn = document.getElementById("login-btn") as HTMLButtonElement;

	submitBtn.addEventListener("click", () => {
		const login = (document.getElementById("login") as HTMLInputElement).value;
		const password = (document.getElementById("password") as HTMLInputElement).value;

		fetch('/api/auth/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ login: login, password: password }),
		})
		.then(res => res.json())
		.then(data =>
		{
			localStorage.setItem('login', login);
			const username = localStorage.getItem('login');
			if (username && data.success == true)
			{
				document.getElementById('title')!.textContent = `Hi ${username}`;
				document.getElementById("welcome-div")!.style.display = "block";
				document.getElementById("welcome-div")!.textContent = `Welcome ${username}, you are now connected :)`;
			}
			else
			{
				document.getElementById('title')!.textContent = `Hi`;
				document.getElementById("welcome-div")!.style.display = "block";
				document.getElementById("welcome-div")!.textContent = `Sorry. Your credentials doesn't match.`;
			}
		});
		// console.log(login, "Password:", password);
	});
}

// --- form to create account
export function initRegistration()
{
	const registerBtn = document.getElementById("registerBtn");

	registerBtn?.addEventListener("click", () => {
	document.getElementById("connexionBlock")!.style.display = "none";
	const container = document.getElementById("register-container");
	if (container)
		return; // avoid to create several times the same account

	const form = document.createElement("div");
	form.id = "register-container";
	form.innerHTML = `
		<div id="registrationBlock" class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<h1 id="title" class="text-3xl font-bold mb-6 text-blue-600">Hi</h1>
			<input id="new-username" placeholder="Username" class="mb-4 px-4 py-2 border rounded w-64"/><br/>
			<input id="new-password" placeholder="Password" type="password" class="mb-4 px-4 py-2 border rounded w-64"/><br/>
			<input id="new-alias" placeholder="Alias" class="mb-4 px-4 py-2 border rounded w-64"/><br/>
			<button id="create-account" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Create Account</button>
			<button id="backToLogin" class="cursor-pointer text-blue-500 underline">Click here to be back to log in</button>
		</div>
	`;
	
	document.body.appendChild(form);

	document.getElementById("backToLogin")?.addEventListener("click", () => {
	document.getElementById("register-container")?.remove();
	document.getElementById("connexionBlock")!.style.display = "flex";
	});

	document.getElementById("create-account")?.addEventListener("click", () => {
		const username = (document.getElementById("new-username") as HTMLInputElement).value;
		const password = (document.getElementById("new-password") as HTMLInputElement).value;
		const alias = (document.getElementById("new-alias") as HTMLInputElement).value;

		fetch('/api/auth/register', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ login: username, password, alias })
		})
		.then(res => res.json())
		.then(data => console.log("Account created:", data))
		.catch(err => console.error(err));
	});
	});
}

export function modifyInfo()
{
	const btn = document.getElementById("btn") as HTMLButtonElement;

	btn.addEventListener("click", () => {
		const alias = (document.getElementById("btn") as HTMLInputElement).value;

		fetch('/api/auth/info', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ alias : alias }),
		})
		.then(res => res.json())
		.then(data => console.log("You are in info page & data:", data))
	});
}