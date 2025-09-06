import db from '../src/database.js';

export async function matchesRoutes(fastify)
{
    fastify.post('/games/matches', { preHandler: fastify.auth }, async (req, reply) => {
        try {
            const { 
                player1,
				player2,
				scorePlayer1,
				scorePlayer2,
				winner,
				gameMode
            } = req.body;
			console.log('after req.body');
				console.log(`
				player1: ${player1},
				player2: ${player2},
				scorePlayer1: ${scorePlayer1},
				scorePlayer2: ${scorePlayer2},
				winner: ${winner},
				gameMode: ${gameMode},
			`)
        
			if (!player1 || !player2 || !winner || !gameMode)
				return reply.code(400).send({ error: 'Missing required fields' });
			
			const userId = req.user.id;
			
			console.log('req.user.id');
			console.log('before sending userId');
			console.log(`userId = ${userId}`);
			console.log("typeof userId =", typeof userId, "value =", userId);

			if (!userId)
				return reply.code(401).send({ error: 'Unauthorized' });

			const stmt = db.prepare(`
				INSERT INTO matches
				(userid, player1, player2, scorePlayer1, scorePlayer2, winner, gameMode, finished_at)
				VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
			`);

			const result = stmt.run(userId, player1, player2, scorePlayer1, scorePlayer2, winner, gameMode);

			return reply.code(201).send({ success: true, message: 'Match created successfully', matchId: result.lastInsertRowid });
        }
		catch (error)
		{
			console.error("Error creating match:", error);
            fastify.log.error('Error creating match:', error);
            return reply.status(500).send({
                error: 'Internal Server Error',
                message: 'Failed to create match'
            });
        }
    });

	fastify.get('/games/nbMatchesPlayed', { preHandler: fastify.auth }, async (request, reply) => {
		const userId = request.user.id;
		const stmt = db.prepare("SELECT matchid, player1, player2, scorePlayer1, scorePlayer2, gameMode, finished_at FROM matches WHERE userid = ?");
		const users = stmt.all(userId);
		return reply.status(200).send(users);
	});
}