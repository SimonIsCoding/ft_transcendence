import jwt from 'jsonwebtoken';
import { loadSecretKey } from '../utils/loadSecretKey.js';

const cookieSecretKey = loadSecretKey('SECRET_KEY_FILE');

export async function auth(request, reply)
{
  const token = request.cookies.token;
  if (!token)
    return reply.status(401).send({ error: 'Not authenticated'/*, authenticated: false*/ });

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
