import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import db from '../src/database.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function uploadProfilePictureRoute(fastify)
{
  fastify.post('/uploadProfilePicture', { preHandler: [fastify.auth] }, async (request, reply) => {

	const data = await request.file(); // recover uploaded file
    if (!data)
      return reply.status(400).send({ error: 'No file uploaded' });

    if (!data.mimetype.startsWith('image/'))
      return reply.status(400).send({ error: 'Only images are allowed' });

    const ext = path.extname(data.filename);
    const filename = `${randomUUID()}${ext}`;
    const filePath = path.join(__dirname, '../../var/www/html/pong/profile_pictures', filename);

    try
	{
      await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
      await fs.promises.writeFile(filePath, await data.toBuffer());
    }
	catch (err)
	{
      return reply.status(500).send({ error: 'Failed to save file', details: err.message});
    }

    const userId = request.user?.id;
    if (!userId)
      return reply.status(401).send({ error: 'Not authenticated: userId not found in token' });

    const update = db.prepare('UPDATE users SET profile_picture = ? WHERE id = ?');
    update.run(`/profile_pictures/${filename}`, userId);

    return reply.send({
      success: true,
      message: "Image well received",
      userLogin: request.user.login,
      path: `/profile_pictures/${filename}`
    });
  });
}
