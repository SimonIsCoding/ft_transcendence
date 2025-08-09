//first function to check which friends can we add
export async function getTotalUser()
{
	const res = await fetch('/api/auth/countTotalUsers', {
		method: 'GET',
		credentials: 'include'
	})

	const data = await res.json();
	return data;
}