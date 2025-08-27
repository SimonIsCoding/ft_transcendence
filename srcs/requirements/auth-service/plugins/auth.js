import {verifyAndUpdateSession} from '../utils/sessionTokens.js';

export async function authCheck(request, reply) {
  try {
    const token = request.cookies.auth_token;
    if (!token) {
      return reply.code(401).send({ error: 'Missing token' });
    }

    const decoded = await request.jwtVerify(token);

    if (!decoded.userId || !decoded.sessionToken) {
	  reply.clearCookie('auth_token');
      return reply.code(401).send({ error: 'Invalid token' });
    }

    await verifyAndUpdateSession(decoded.userId, decoded.sessionToken);

    // attach user info so routes can use it directly
    request.user = {
      id: decoded.userId,
	  is2FAVerified: decoded.is2FAVerified,
      sessionToken: decoded.sessionToken
    };

  } catch (err) {
	reply.clearCookie('auth_token');
    return reply.code(401).send({ error: 'Unauthorized', details: err.message });
  }
}
