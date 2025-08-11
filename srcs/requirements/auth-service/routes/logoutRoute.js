export async function logoutRoute(app) {
  app.post('/logout', async (request, reply) => {
    // Clear both authentication cookies
    ['auth_token', 'auth_phase'].forEach(cookieName => {
      reply.clearCookie(cookieName, {
        path: '/',
        secure: true,
        httpOnly: true,
        sameSite: 'strict'
      });
    });

    // Optional: Add JWT to blacklist if needed
    // const token = request.cookies.auth_token;
    // if (token) await blacklistToken(token);

    return reply.send({ 
      success: true, 
      message: 'Logged out successfully' 
    });
  });
}
