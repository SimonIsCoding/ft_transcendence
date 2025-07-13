export function getToken()
{
  return localStorage.getItem("token");
}

export function isConnected() {
  fetch('/api/private/info', {
    method: 'GET',
    credentials: 'include',
  })
    .then(res => {
      if (!res.ok) throw new Error("Unauthorized");
      return res.json();
    })
    .then(data => {
      const loginIcon = document.getElementById("login-icon");
      const loggedIcon = document.getElementById("logged-icon");
      console.log("User info:", data);
      loginIcon?.classList.add("hidden");
      loggedIcon?.classList.remove("hidden");
    })
    .catch(() => {
      // Pas connecté
      const loginIcon = document.getElementById("login-icon");
      const loggedIcon = document.getElementById("logged-icon");
      loggedIcon?.classList.add("hidden");
      loginIcon?.classList.remove("hidden");
    });
}

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
		credentials: 'include' 
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
				localStorage.setItem("token", data.token);
				console.log("JWToken received:", data.token);
			}
			else
			{
				document.getElementById('title')!.textContent = `Hi`;
				document.getElementById("welcome-div")!.style.display = "block";
				document.getElementById("welcome-div")!.textContent = `Sorry. Your credentials doesn't match.`;
			}
		});
		console.log("login: ", login, "Password:", password);

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
		body: JSON.stringify({ login: username, password, alias }),
		credentials: 'include'
		})
		.then(res => 
		{
			if (res.status === 200)
			{
				const registrationCreated = document.createElement("p");
				registrationCreated.id = "registration-created";
				registrationCreated.innerHTML = `Wonderful. You have created your account. You can connect to your account now.`;
				document.getElementById("registrationBlock")?.appendChild(registrationCreated);
			}
			return res.json();
		})
		.then(data =>
		{
		console.log("Account created:", data);
		const token = data.token;
		console.log("JWToken received:", token);
		})
		.catch(err => console.error(err));
	});
	});
}

export function loginLogo(isAuthenticated: boolean)
{
  const loginIcon = document.getElementById("login-icon");
  const loggedIcon = document.getElementById("logged-icon");

  if (!isAuthenticated)
    loginIcon?.classList.remove("hidden");
  else
    loggedIcon?.classList.remove("hidden");
}

export function modifyInfo()
{
		fetch('/api/auth/info', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({}),
		credentials: 'include'
		})
		.then(res => res.json())
		.then(data =>
		{
			console.log("You are in info page & data:", data);
			// localStorage.setItem("token", data.token);
			console.log("in modifyInfo() JWToken received:", getToken());
			// const token = getToken();
			// if (token)

		})
}

export async function initInfo(): Promise<boolean>
{
	try
	{
		const res = await fetch('/api/auth/info',
		{
	    	method: 'GET',
	    	credentials: 'include'
		});	
	  	if (!res.ok)
			throw new Error('Not authenticated');	
	  	const data = await res.json();
	  	console.log("User info received:", data);
	  	return true; //  connected
	}
	catch (err)
	{
		console.warn("User not authenticated:", err);
		return false; // not connected
	}
}
