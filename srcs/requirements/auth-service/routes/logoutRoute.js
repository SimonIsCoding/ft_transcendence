export async function logoutRoute(app)
{
  app.get('/logout', async (request, reply) => {
    reply.clearCookie('token', {
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: 'strict'
    });
    return reply.send({ success: true, message: 'Logged out' });
  });
}
