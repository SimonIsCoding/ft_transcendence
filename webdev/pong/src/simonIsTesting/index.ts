console.log('index.ts chargé');

const button = document.getElementById('bg-button');
button?.addEventListener('click', () => {
  document.body.style.backgroundColor = '#add8e6';
});

const submitBtn = document.getElementById("submit-btn") as HTMLButtonElement;

submitBtn.addEventListener("click", () => {
	const login = (document.getElementById("login") as HTMLInputElement).value;
	const password = (document.getElementById("password") as HTMLInputElement).value;

	fetch('/api/auth/login', {
	  method: 'POST',
	  headers: { 'Content-Type': 'application/json' },
	  body: JSON.stringify({ login: login, password: password }),
	})
	  .then(res => res.json())
  	  .then(data => console.log(data));

	console.log("Login:", login, "Password:", password);
});

