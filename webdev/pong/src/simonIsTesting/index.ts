const submitBtn = document.getElementById("login-btn") as HTMLButtonElement;

submitBtn.addEventListener("click", () => {
	const login = (document.getElementById("login") as HTMLInputElement).value;
	const password = (document.getElementById("login_password") as HTMLInputElement).value;

	fetch('/api/auth/login', {
	  method: 'POST',
	  headers: { 'Content-Type': 'application/json' },
	  body: JSON.stringify({ login: login, password: password }),
	})
	  .then(res => res.json())
  	  .then(data => {
    document.getElementById("welcome-div")!.style.display = data.success ? "block" : "none";
  });

	console.log(login, "Password:", password);
});

// --- form to create account
const registerBtn = document.getElementById("registerBtn");

registerBtn?.addEventListener("click", () => {
  const container = document.getElementById("register-container");
  if (container)
	return; // avoid to create the container several times

  const form = document.createElement("div");
  form.id = "register-container";
  form.innerHTML = `
    <input id="new_username" placeholder="Username" /><br/>
    <input id="new_password" placeholder="Password" type="password" /><br/>
    <input id="new_alias" placeholder="Alias" /><br/>
    <button id="create-account">Create Account</button>
  `;
  document.body.appendChild(form);

  document.getElementById("create-account")?.addEventListener("click", () => {
    const new_username = (document.getElementById("new_username") as HTMLInputElement).value;
    const new_password = (document.getElementById("new_password") as HTMLInputElement).value;
    const new_alias = (document.getElementById("new_alias") as HTMLInputElement).value;

	console.log("We are in ft_transcendence/webdev/pong/src/simonIsTesting/index.ts & NEW_PASSWORD=", new_password);

    fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ new_user: new_username, new_password, new_alias })
    })
    .then(res => res.json())
    .then(data => console.log("Account created:", data))
    .catch(err => console.error(err));
  });
});
