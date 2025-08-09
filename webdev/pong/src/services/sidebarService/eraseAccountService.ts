export async function eraseAccountService()
{
	const login = await fetch("/api/auth/info")
	.then(res => res.json())
	.then(data => { return data.login });

	await fetch('/api/auth/logout', {
		method: 'GET',
		credentials: 'include'
	})

	await fetch("/api/auth/eraseAccount", {
		method: 'POST',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ login: login })
	})
}