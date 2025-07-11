export function initSimonFeatures()
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
				document.getElementById('title')!.textContent = `Hi ${username}`;
			document.getElementById("welcome-div")!.style.display = data.success ? "block" : "none";
			document.getElementById("welcome-div")!.textContent = `Welcome ${username}, you are now connected :)`;
		});

		console.log(login, "Password:", password);
	});

	// --- form to create account
	const registerBtn = document.getElementById("registerBtn");

	registerBtn?.addEventListener("click", () => {
	const container = document.getElementById("register-container");
	if (container)
		return; // avoid to create several times the same account

	const form = document.createElement("div");
	form.id = "register-container";
	form.innerHTML = `
		<input id="new-username" placeholder="Username" /><br/>
		<input id="new-password" placeholder="Password" type="password" /><br/>
		<input id="new-alias" placeholder="Alias" /><br/>
		<button id="create-account">Create Account</button>
	`;
	document.body.appendChild(form);

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
