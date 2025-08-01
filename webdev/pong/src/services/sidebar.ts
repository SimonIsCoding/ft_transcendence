export async function initSidebarBehavior(): Promise<boolean>
{
	const res = await fetch('/api/auth/status', {
			method: 'GET',
  			credentials: 'include' 
	})

	const data = await res.json();
	if (data.authenticated === true)
	{
		console.log("data.authenticated = ", data.authenticated);
		return true;
	}
	console.log("data.authenticated = ", data.authenticated);
	return false;
}