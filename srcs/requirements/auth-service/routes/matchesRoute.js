import db from '../src/database.js';

export async function matchesRoutes(fastify) {
    // fastify.get('/game/matches/:id', { preHandler: fastify.auth }, async (req, reply) => {
    //     try {
    //         const matchId = req.params.id;
    //         const userId = req.user.id;

    //         // Validate match ID
    //         if (!matchId || isNaN(matchId)) {
    //             return reply.status(400).send({
    //                 error: 'Invalid match ID',
    //                 message: 'Match ID must be a valid number'
    //             });
    //         }

    //         // Get the match
    //         const match = db.prepare(
    //             `SELECT * FROM matches WHERE matchid = ?`
    //         ).get(matchId);

    //         // Check if match exists
    //         if (!match) {
    //             return reply.status(404).send({
    //                 error: 'Match not found',
    //                 message: `Match with ID ${matchId} does not exist`
    //             });
    //         }

    //         // Check if user has permission to view this match
    //         if (match.userid !== null && match.userid !== userId) {
    //             return reply.status(403).send({
    //                 error: 'Access denied',
    //                 message: 'You can only view your own matches'
    //             });
    //         }

    //         return reply.status(200).send(match);

    //     } catch (error) {
    //         fastify.log.error('Error fetching match:', error);
    //         return reply.status(500).send({
    //             error: 'Internal Server Error',
    //             message: 'Failed to fetch match'
    //         });
    //     }
    // });

    // fastify.put('/game/matches/:id', { preHandler: fastify.auth }, async (req, reply) => {
    //     try {
    //         const matchId = req.params.id;
    //         const userId = req.user.id;
    //         const updates = req.body;

    //         // Validate match ID
    //         if (!matchId || isNaN(matchId)) {
    //             return reply.status(400).send({
    //                 error: 'Invalid match ID',
    //                 message: 'Match ID must be a valid number'
    //             });
    //         }

    //         // Validate that there are updates
    //         if (!updates || Object.keys(updates).length === 0) {
    //             return reply.status(400).send({
    //                 error: 'No updates provided',
    //                 message: 'Request body must contain fields to update'
    //             });
    //         }

    //         // First, get the current match to check permissions
    //         const currentMatch = db.prepare(
    //             `SELECT * FROM matches WHERE matchid = ?`
    //         ).get(matchId);

    //         if (!currentMatch) {
    //             return reply.status(404).send({
    //                 error: 'Match not found',
    //                 message: `Match with ID ${matchId} does not exist`
    //             });
    //         }

    //         // Check if user has permission to update this match
    //         if (currentMatch.userid !== null && currentMatch.userid !== userId) {
    //             return reply.status(403).send({
    //                 error: 'Access denied',
    //                 message: 'You can only update your own matches'
    //             });
    //         }

    //         // Build the update query dynamically based on provided fields
    //         const allowedFields = [
    //             'score1', 'score2', 'is_finished', 'finished_at',
    //             'has_ai', 'ai_level', 'paddle_size', 'ball_speed', 'score_limit'
    //         ];

    //         const updateFields = [];
    //         const updateValues = [];

    //         Object.keys(updates).forEach(field => {
    //             if (allowedFields.includes(field)) {
    //                 updateFields.push(`${field} = ?`);
    //                 updateValues.push(updates[field]);
    //             }
    //         });

    //         // Add finished_at timestamp if match is being marked as finished
    //         if (updates.is_finished === 1 && !updates.finished_at) {
    //             updateFields.push('finished_at = CURRENT_TIMESTAMP');
    //         }

    //         if (updateFields.length === 0) {
    //             return reply.status(400).send({
    //                 error: 'Invalid update fields',
    //                 message: `Only these fields can be updated: ${allowedFields.join(', ')}`
    //             });
    //         }

    //         updateValues.push(matchId);

    //         // Execute the update
    //         db.prepare(
    //             `UPDATE matches SET ${updateFields.join(', ')} WHERE matchid = ?`
    //         ).run(...updateValues);

    //         // Get the updated match
    //         const updatedMatch = db.prepare(
    //             `SELECT * FROM matches WHERE matchid = ?`
    //         ).get(matchId);

    //         return reply.status(200).send({
    //             message: 'Match updated successfully',
    //             match: updatedMatch
    //         });

    //     } catch (error) {
    //         fastify.log.error('Error updating match:', error);
    //         return reply.status(500).send({
    //             error: 'Internal Server Error',
    //             message: 'Failed to update match'
    //         });
    //     }
    // });

    // fastify.put('/game/matches/:id/finish', { preHandler: fastify.auth }, async (req, reply) => {
    //     try {
    //         const matchId = req.params.id;
    //         const userId = req.user.id;
    //         const { score1, score2 } = req.body;

    //         // Validate match ID
    //         if (!matchId || isNaN(matchId)) {
    //             return reply.status(400).send({
    //                 error: 'Invalid match ID',
    //                 message: 'Match ID must be a valid number'
    //             });
    //         }

    //         // Validate scores
    //         if (score1 === undefined || score2 === undefined) {
    //             return reply.status(400).send({
    //                 error: 'Missing scores',
    //                 message: 'Both score1 and score2 are required'
    //             });
    //         }

    //         if (!Number.isInteger(score1) || !Number.isInteger(score2) || score1 < 0 || score2 < 0) {
    //             return reply.status(400).send({
    //                 error: 'Invalid scores',
    //                 message: 'Scores must be non-negative integers'
    //             });
    //         }

    //         // Get the current match to check permissions
    //         const currentMatch = db.prepare(
    //             `SELECT * FROM matches WHERE matchid = ?`
    //         ).get(matchId);

    //         if (!currentMatch) {
    //             return reply.status(404).send({
    //                 error: 'Match not found',
    //                 message: `Match with ID ${matchId} does not exist`
    //             });
    //         }

    //         // Check if user has permission to update this match
    //         if (currentMatch.userid !== null && currentMatch.userid !== userId) {
    //             return reply.status(403).send({
    //                 error: 'Access denied',
    //                 message: 'You can only update your own matches'
    //             });
    //         }

    //         // Check if match is already finished
    //         if (currentMatch.is_finished === 1) {
    //             return reply.status(400).send({
    //                 error: 'Match already finished',
    //                 message: 'Cannot update a finished match'
    //             });
    //         }

    //         // Update the match with scores and finish status
    //         db.prepare(
    //             `UPDATE matches SET score1 = ?, score2 = ?, is_finished = 1, finished_at = CURRENT_TIMESTAMP WHERE matchid = ?`
    //         ).run(score1, score2, matchId);

    //         // Get the updated match
    //         const updatedMatch = db.prepare(
    //             `SELECT * FROM matches WHERE matchid = ?`
    //         ).get(matchId);

    //         return reply.status(200).send({
    //             message: 'Match finished successfully',
    //             match: updatedMatch
    //         });

    //     } catch (error) {
    //         fastify.log.error('Error finishing match:', error);
    //         return reply.status(500).send({
    //             error: 'Internal Server Error',
    //             message: 'Failed to finish match'
    //         });
    //     }
    // });

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
			console.log('req.user.id');
			const userId = req.user.id;
			console.log('before sending userId');
			console.log(`userId = ${userId}`);
			console.log("typeof userId =", typeof userId, "value =", userId);
			if (!userId)
				return reply.code(401).send({ error: 'Unauthorized' });
			// Insert the new match
			const stmt = db.prepare(`
				INSERT INTO matches
				(userid, player1, player2, scorePlayer1, scorePlayer2, winner, gameMode, finished_at)
				VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
			`);

			const result = stmt.run(userId, player1, player2, scorePlayer1, scorePlayer2, winner, gameMode);
			// console.log(`after run`);

			return reply.code(201).send({ success: true, matchId: result.lastInsertRowid });
            // return reply.status(201).send({
                // message: 'Match created successfully'
                // match: match
            // });

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
}