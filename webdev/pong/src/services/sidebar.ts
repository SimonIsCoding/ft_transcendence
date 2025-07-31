export async function initSidebarBehavior(): Promise<boolean>
{
	const res = await fetch('/api/auth/status', {
			method: 'GET',
  			credentials: 'include' 
	})

	const data = await res.json();
	if (data.authenticated === true)
		return true;
	return false;
}