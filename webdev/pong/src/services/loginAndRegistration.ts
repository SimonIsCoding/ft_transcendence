export function isConnected(user: User): void {
	console.log("in isConnected(), user: ", user);
  fetch('/api/private/info', {
    method: 'GET',
    credentials: 'include',
  })
    .then(res => {
      if (!res.ok) throw new Error("Unauthorized");
      return res.json();
    })
    .then(data => {
	//   console.log("In isConnected(): Token received via cookie:", data.token);
	  console.log("In isConnected(): userId:", data.userId);
	  console.log("In isConnected(): login:", data.login);
	  console.log("In isConnected(): alias:", data.alias);
	  console.log("connecté in data");
      const loginIcon = document.getElementById("login-icon");
      const loggedIcon = document.getElementById("logged-icon");
      console.log("User info:", data);
      loginIcon?.classList.add("hidden");
      loggedIcon?.classList.remove("hidden");
    })
    .catch(() => {
      // Pas connecté
	  console.log("Pas connecté, in catch");
      const loginIcon = document.getElementById("login-icon");
      const loggedIcon = document.getElementById("logged-icon");
      loggedIcon?.classList.add("hidden");
      loginIcon?.classList.remove("hidden");
    });
}

// --- form to log in
export function initLogin()
{
	const submitBtn = document.getElementById("loginBtn") as HTMLButtonElement;

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
				document.getElementById("login")!.style.display = "none";
				document.getElementById("password")!.style.display = "none";
				document.getElementById("loginBtn")!.style.display = "none";
				document.getElementById("registerBtn")!.style.display = "none";
				document.getElementById("logoutBtn")!.style.display = "block";
			}
			else
			{
				document.getElementById('title')!.textContent = `Hi`;
				document.getElementById("welcome-div")!.style.display = "block";
				document.getElementById("welcome-div")!.textContent = `Sorry. Your credentials doesn't match.`;
			}
		});
		console.log("login: ", login, "Password:", password);
		
		//to get the token
		fetch('/api/auth/debug-token', {
		  credentials: 'include',
		})
		  .then(res => res.json())
		  .then(data => console.log("Token received via cookie:", data.token));

		//to get the user data
		fetch('/api/auth/info', {
		method: 'GET',
		credentials: 'include',
		})
		.then(res => {
	      if (!res.ok) throw new Error("Unauthorized");
	      return res.json();
	    })
	    .then(data => {
		  console.log("In isConnected(): userId:", data.userId);
		  console.log("In isConnected(): login:", data.login);
		  console.log("In isConnected(): alias:", data.alias);
		});

		// login.js
		fetch('/api/auth/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username: 'alice', password: '1234' })
		});
	});
}

interface User {
  login: string;
  password: string;
  alias: string;
  token: string;
}

// --- form to create account
export async function initRegistration(onUserRegistered: (user: User) => void)
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

	document.getElementById("create-account")?.addEventListener("click", async () => {
	const username = (document.getElementById("new-username") as HTMLInputElement).value;
	const password = (document.getElementById("new-password") as HTMLInputElement).value;
	const alias = (document.getElementById("new-alias") as HTMLInputElement).value;
	
	const response = await fetch('/api/auth/register', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({ login: username, password, alias }),
	credentials: 'include'
	});
	
	const result = await response.json();
	const user: User = {
     login: result.data.user.login,
	 password: result.data.password,
      alias: alias,
      token: result.data.token
    };

	const registrationBlock = document.getElementById("registrationBlock");
	let registrationCreated = document.getElementById("registration-created") as HTMLParagraphElement | null;
	if (!registrationCreated)
	{
		registrationCreated = document.createElement("p");
		registrationCreated.id = "registration-created";
		registrationBlock?.appendChild(registrationCreated);
	}
	if (result.status === 200)
	{
		registrationCreated.textContent = "Wonderful. You have created your account. You can connect to your account now.";
		onUserRegistered(user);
	}
	else if (result.status === 500)
		registrationCreated.textContent = "DB Error";
	else
		registrationCreated.textContent = "An account with this login has already been created.";
	
	console.log(user);

	});
	});
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
