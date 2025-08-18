export async function logoutRoute(app)
{
  
  app.get('/logout', async (request, reply) => {
	const token = request.cookies.token;
	console.log(`\nin /logout token = ${token}`);

		if (token)
		{
			try
			{
				const decoded = jwt.verify(token, cookieSecretKey);
				// Déconnecter la session
				db.prepare('UPDATE sessions SET connected = 0 WHERE session_id = ?').run(decoded.session_id);
			}
			catch(err)
			{
				// Si le token est invalide, on ignore
			}
		}
    reply.clearCookie('token', {
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: 'lax'
    });
    return reply.send({ success: true, message: 'Logged out' });
  });
}
