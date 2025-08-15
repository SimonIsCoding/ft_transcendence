export async function logoutRoute(app)
{
  app.get('/logout', async (request, reply) => {
    reply.clearCookie('token', {
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: 'none' //'strict'
    });
    return reply.send({ success: true, message: 'Logged out' });
  });
}
