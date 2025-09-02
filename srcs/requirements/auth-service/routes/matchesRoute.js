import db from '../src/database.js';


export async function matchesRoutes(fastify)
{
	fastify.get('/games/matches/:id', { preHandler: fastify.auth }, async (req, reply) => {
	  try {
	    const matchId = req.params.id;
	    const userId = req.user.id;

	    // Validate match ID
	    if (!matchId || isNaN(matchId)) {
	      return reply.status(400).send({
	        error: 'Invalid match ID',
	        message: 'Match ID must be a valid number'
	      });
	    }

	    // Get the match
	    const match = await db.get(
	      `SELECT * FROM matches WHERE matchid = ?`,
	      [matchId]
	    );

	    // Check if match exists
	    if (!match) {
	      return reply.status(404).send({
	        error: 'Match not found',
	        message: `Match with ID ${matchId} does not exist`
	      });
	    }

	    // Optional: Check if user has permission to view this match
	    // (user can view their own matches or matches where they're a player)
	    if (match.userid !== null && match.userid !== userId) {
	      return reply.status(403).send({
	        error: 'Access denied',
	        message: 'You can only view your own matches'
	      });
	    }

	    return reply.status(200).send(match);

	  } catch (error) {
	    fastify.log.error('Error fetching match:', error);
	    return reply.status(500).send({
	      error: 'Internal Server Error',
	      message: 'Failed to fetch match'
	    });
	  }
	});

	fastify.put('/games/matches/:id', { preHandler: fastify.auth }, async (req, reply) => {
	  try {
	    const matchId = req.params.id;
	    const userId = req.user.id;
	    const updates = req.body;

	    // Validate match ID
	    if (!matchId || isNaN(matchId)) {
	      return reply.status(400).send({
	        error: 'Invalid match ID',
	        message: 'Match ID must be a valid number'
	      });
	    }

	    // Validate that there are updates
	    if (!updates || Object.keys(updates).length === 0) {
	      return reply.status(400).send({
	        error: 'No updates provided',
	        message: 'Request body must contain fields to update'
	      });
	    }

	    const db = fastify.sqlite;

	    // First, get the current match to check permissions
	    const currentMatch = await db.get(
	      `SELECT * FROM matches WHERE matchid = ?`,
	      [matchId]
	    );

	    if (!currentMatch) {
	      return reply.status(404).send({
	        error: 'Match not found',
	        message: `Match with ID ${matchId} does not exist`
	      });
	    }

	    // Check if user has permission to update this match
	    // (user can only update their own matches)
	    if (currentMatch.userid !== null && currentMatch.userid !== userId) {
	      return reply.status(403).send({
	        error: 'Access denied',
	        message: 'You can only update your own matches'
	      });
	    }

	    // Build the update query dynamically based on provided fields
	    const allowedFields = [
	      'score1', 'score2', 'is_finished', 'finished_at',
	      'has_ai', 'ai_level', 'paddle_size', 'ball_speed', 'score_limit'
	    ];

	    const updateFields = [];
	    const updateValues = [];

	    Object.keys(updates).forEach(field => {
	      if (allowedFields.includes(field)) {
	        updateFields.push(`${field} = ?`);
	        updateValues.push(updates[field]);
	      }
	    });

	    // Add finished_at timestamp if match is being marked as finished
	    if (updates.is_finished === 1 && !updates.finished_at) {
	      updateFields.push('finished_at = CURRENT_TIMESTAMP');
	    }

	    if (updateFields.length === 0) {
	      return reply.status(400).send({
	        error: 'Invalid update fields',
	        message: `Only these fields can be updated: ${allowedFields.join(', ')}`
	      });
	    }

	    updateValues.push(matchId);

	    // Execute the update
	    await db.run(
	      `UPDATE matches SET ${updateFields.join(', ')} WHERE matchid = ?`,
	      updateValues
	    );

	    // Get the updated match
	    const updatedMatch = await db.get(
	      `SELECT * FROM matches WHERE matchid = ?`,
	      [matchId]
	    );

	    return reply.status(200).send({
	      message: 'Match updated successfully',
	      match: updatedMatch
	    });

	  } catch (error) {
	    fastify.log.error('Error updating match:', error);
	    return reply.status(500).send({
	      error: 'Internal Server Error',
	      message: 'Failed to update match'
	    });
	  }
	});

	fastify.put('/games/matches/:id/finish', { preHandler: fastify.auth }, async (req, reply) => {
	  try {
	    const matchId = req.params.id;
	    const userId = req.user.id;
	    const { score1, score2 } = req.body;

	    // Validate match ID
	    if (!matchId || isNaN(matchId)) {
	      return reply.status(400).send({
	        error: 'Invalid match ID',
	        message: 'Match ID must be a valid number'
	      });
	    }

	    // Validate scores
	    if (score1 === undefined || score2 === undefined) {
	      return reply.status(400).send({
	        error: 'Missing scores',
	        message: 'Both score1 and score2 are required'
	      });
	    }

	    if (!Number.isInteger(score1) || !Number.isInteger(score2) || score1 < 0 || score2 < 0) {
	      return reply.status(400).send({
	        error: 'Invalid scores',
	        message: 'Scores must be non-negative integers'
	      });
	    }

	    // Get the current match to check permissions
	    const currentMatch = await db.get(
	      `SELECT * FROM matches WHERE matchid = ?`,
	      [matchId]
	    );

	    if (!currentMatch) {
	      return reply.status(404).send({
	        error: 'Match not found',
	        message: `Match with ID ${matchId} does not exist`
	      });
	    }

	    // Check if user has permission to update this match
	    if (currentMatch.userid !== null && currentMatch.userid !== userId) {
	      return reply.status(403).send({
	        error: 'Access denied',
	        message: 'You can only update your own matches'
	      });
	    }

	    // Check if match is already finished
	    if (currentMatch.is_finished === 1) {
	      return reply.status(400).send({
	        error: 'Match already finished',
	        message: 'Cannot update a finished match'
	      });
	    }

	    // Update the match with scores and finish status
	    await db.run(
	      `UPDATE matches SET score1 = ?, score2 = ?, is_finished = 1, finished_at = CURRENT_TIMESTAMP WHERE matchid = ?`,
	      [score1, score2, matchId]
	    );

	    // Get the updated match
	    const updatedMatch = await db.get(
	      `SELECT * FROM matches WHERE matchid = ?`,
	      [matchId]
	    );

	    return reply.status(200).send({
	      message: 'Match finished successfully',
	      match: updatedMatch
	    });

	  } catch (error) {
	    fastify.log.error('Error finishing match:', error);
	    return reply.status(500).send({
	      error: 'Internal Server Error',
	      message: 'Failed to finish match'
	    });
	  }
	});

	fastify.post('/games/matches', { preHandler: fastify.auth }, async (req, reply) => {
	  try {
	    const { 
	      alias1, 
	      alias2, 
	      user_player = 0, 
	      has_ai = 0, 
	      ai_level = 1, 
	      paddle_size = 20, 
	      ball_speed = 5, 
	      score_limit = 5,
	      tournament_id = null 
	    } = req.body;
	
	    const userId = req.user.id;

	    // Validate required fields
	    if (!alias1 || !alias2) {
	      return reply.status(400).send({
	        error: 'Missing required fields',
	        message: 'Both alias1 and alias2 are required'
	      });
	    }

	    // Validate user_player
	    if (user_player < 0 || user_player > 2) {
	      return reply.status(400).send({
	        error: 'Invalid user_player',
	        message: 'user_player must be between 0 and 2 (0=no user, 1=alias1, 2=alias2)'
	      });
	    }

	    // Validate user_player consistency
	    if (user_player > 0 && !userId) {
	      return reply.status(400).send({
	        error: 'Invalid user configuration',
	        message: 'user_player requires an authenticated user'
	      });
	    }

	    // Validate tournament_id if provided
	    if (tournament_id !== null) {
	      const tournamentExists = await db.get(
	        'SELECT tournamentid FROM tournaments WHERE tournamentid = ?',
	        [tournament_id]
	      );
	      if (!tournamentExists) {
	        return reply.status(400).send({
	          error: 'Invalid tournament',
	          message: 'The specified tournament does not exist'
	        });
	      }
	    }

	    // Insert the new match
	    const result = await db.run(
	      `INSERT INTO matches 
	       (userid, alias1, alias2, user_player, has_ai, ai_level, paddle_size, ball_speed, score_limit, tournament_id) 
	       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
	      [userId, alias1, alias2, user_player, has_ai, ai_level, paddle_size, ball_speed, score_limit, tournament_id]
	    );

	    // Get the newly created match
	    const match = await db.get(
	      `SELECT * FROM matches WHERE matchid = ?`,
	      [result.lastID]
	    );

	    return reply.status(201).send({
	      message: 'Match created successfully',
	      match: match
	    });

	  } catch (error) {
	    fastify.log.error('Error creating match:', error);
	    return reply.status(500).send({
	      error: 'Internal Server Error',
	      message: 'Failed to create match'
	    });
	  }
	});

}