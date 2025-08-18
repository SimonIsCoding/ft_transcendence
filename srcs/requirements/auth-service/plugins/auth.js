// import jwt from 'jsonwebtoken';
// import { loadSecretKey } from '../utils/loadSecretKey.js';

// const cookieSecretKey = loadSecretKey('SECRET_KEY_FILE');

// export async function auth(request, reply)
// {
// 	const token = request.cookies.token;
// 	console.log(`in auth plugin token = ${token}`);
// 	if (!token)
// 		return reply.status(401).send({ error: 'Not authenticated' });

// 	try
// 	{
// 		const decoded = await request.jwtVerify();
// 		request.user = decoded;

// 		// Vérifier que la session est encore active
// 		const session = db.prepare('SELECT connected FROM sessions WHERE session_id = ?').get(decoded.session_id);
// 		if (!session || session.connected !== 1)
// 			return reply.status(401).send({ error: 'Session inactive' });
// 	}
// 	catch (err)
// 	{
// 		return reply.status(401).send({ error: 'Invalid token' });
// 	}
// }
import jwt from 'jsonwebtoken';
import { loadSecretKey } from '../utils/loadSecretKey.js';

const cookieSecretKey = loadSecretKey('SECRET_KEY_FILE');

export async function auth(request, reply)
{
  const token = request.cookies.token;
  if (!token)
    return reply.send({ error: 'Not authenticated'/*, authenticated: false*/ });

  try
  {
    const decoded = jwt.verify(token, cookieSecretKey);
    request.user = decoded;
  }
  catch (err)
  {
    return reply.status(401).send({ error: 'Invalid token'/*, authenticated: false*/ });
  }
}	