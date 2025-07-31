import jwt from 'jsonwebtoken';

export async function auth(request, reply)
{
  const token = request.cookies.token;
  console.log('Cookies received :', request.cookies);
  console.log('if Cookies received is undefined, it means error');
  console.log('Token received:', request.cookies.token);

  if (!token)
    return reply.status(401).send({ error: 'Not authenticated' });

  try
  {
    const decoded = jwt.verify(token, 'super-secret-key');
    request.user = decoded;
  }
  catch (err)
  {
    return reply.status(401).send({ error: 'Invalid token' });
  }
}
