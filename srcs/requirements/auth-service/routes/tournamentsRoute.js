import db from '../src/database.js';


export async function tournamentsRoutes(fastify)
{
	fastify.get('/game/tournaments/:id', { preHandler: fastify.auth }, async (req, reply) => {
	  try {
	    const tournamentId = req.params.id;
	    const userId = req.user.id;

	    // Validate tournament ID
	    if (!tournamentId || isNaN(tournamentId)) {
	      return reply.status(400).send({
	        error: 'Invalid tournament ID',
	        message: 'Tournament ID must be a valid number'
	      });
	    }

	    // Get the tournament
	    const tournament = await db.get(
	      `SELECT * FROM tournaments WHERE tournamentid = ?`,
	      [tournamentId]
	    );

	    // Check if tournament exists
	    if (!tournament) {
	      return reply.status(404).send({
	        error: 'Tournament not found',
	        message: `Tournament with ID ${tournamentId} does not exist`
	      });
	    }

	    // Optional: Check if user has permission to view this tournament
	    // (if you want to restrict access to tournament creator only)
	    if (tournament.userid !== userId) {
	      return reply.status(403).send({
	        error: 'Access denied',
	        message: 'You can only view your own tournaments'
	      });
	    }

	    // Get the associated matches if they exist
	    let matches = [];
	    if (tournament.semifinal1_matchid || tournament.semifinal2_matchid || tournament.final_matchid) {
	      const matchIds = [
	        tournament.semifinal1_matchid,
	        tournament.semifinal2_matchid,
	        tournament.final_matchid
	      ].filter(id => id !== null);

	      if (matchIds.length > 0) {
	        const placeholders = matchIds.map(() => '?').join(',');
	        matches = await db.all(
	          `SELECT * FROM matches WHERE matchid IN (${placeholders})`,
	          matchIds
	        );
	      }
	    }

	    // Structure the response with tournament and its matches
	    const response = {
	      tournament: tournament,
	      matches: {
	        semifinal1: matches.find(m => m.matchid === tournament.semifinal1_matchid) || null,
	        semifinal2: matches.find(m => m.matchid === tournament.semifinal2_matchid) || null,
	        final: matches.find(m => m.matchid === tournament.final_matchid) || null
	      }
	    };

	    return reply.status(200).send(response);

	  } catch (error) {
	    fastify.log.error('Error fetching tournament:', error);
	    return reply.status(500).send({
	      error: 'Internal Server Error',
	      message: 'Failed to fetch tournament'
	    });
	  }
	});

	fastify.put('/games/tournaments/:id', { preHandler: fastify.auth }, async (req, reply) => {
	  try {
	    const tournamentId = req.params.id;
	    const userId = req.user.id;
	    const updates = req.body;

	    // Validate tournament ID
	    if (!tournamentId || isNaN(tournamentId)) {
	      return reply.status(400).send({
	        error: 'Invalid tournament ID',
	        message: 'Tournament ID must be a valid number'
	      });
	    }

	    // Validate that there are updates
	    if (!updates || Object.keys(updates).length === 0) {
	      return reply.status(400).send({
	        error: 'No updates provided',
	        message: 'Request body must contain fields to update'
	      });
	    }

	    // First, get the current tournament to check permissions
	    const currentTournament = await db.get(
	      `SELECT * FROM tournaments WHERE tournamentid = ?`,
	      [tournamentId]
	    );

	    if (!currentTournament) {
	      return reply.status(404).send({
	        error: 'Tournament not found',
	        message: `Tournament with ID ${tournamentId} does not exist`
	      });
	    }

	    // Check if user has permission to update this tournament
	    if (currentTournament.userid !== userId) {
	      return reply.status(403).send({
	        error: 'Access denied',
	        message: 'You can only update your own tournaments'
	      });
	    }

	    // Build the update query dynamically based on provided fields
	    const allowedFields = [
	      'semifinal1_matchid', 'semifinal2_matchid', 'final_matchid',
	      'is_finished', 'finished_at', 'paddle_size', 'ball_speed', 'score_limit'
	    ];

	    const updateFields = [];
	    const updateValues = [];

	    Object.keys(updates).forEach(field => {
	      if (allowedFields.includes(field)) {
	        updateFields.push(`${field} = ?`);
	        updateValues.push(updates[field]);
	      }
	    });

	    // Add finished_at timestamp if tournament is being marked as finished
	    if (updates.is_finished === 1 && !updates.finished_at) {
	      updateFields.push('finished_at = CURRENT_TIMESTAMP');
	    }

	    if (updateFields.length === 0) {
	      return reply.status(400).send({
	        error: 'Invalid update fields',
	        message: `Only these fields can be updated: ${allowedFields.join(', ')}`
	      });
	    }

	    updateValues.push(tournamentId);

	    // Execute the update
	    await db.run(
	      `UPDATE tournaments SET ${updateFields.join(', ')} WHERE tournamentid = ?`,
	      updateValues
	    );

	    // Get the updated tournament
	    const updatedTournament = await db.get(
	      `SELECT * FROM tournaments WHERE tournamentid = ?`,
	      [tournamentId]
	    );

	    return reply.status(200).send({
	      message: 'Tournament updated successfully',
	      tournament: updatedTournament
	    });

	  } catch (error) {
	    fastify.log.error('Error updating tournament:', error);
	    return reply.status(500).send({
	      error: 'Internal Server Error',
	      message: 'Failed to update tournament'
	    });
	  }
	});

	// create tournament
	fastify.post('/game/tournaments', { preHandler: fastify.auth }, async (req, reply) => {
	  try {
	    const { player1_alias, player2_alias, player3_alias, player4_alias, user_player } = req.body;
	    const userId = req.user.id;

	    // Validate required fields
	    if (!player1_alias || !player2_alias || !player3_alias || !player4_alias) {
	      return reply.status(400).send({
	        error: 'Missing required fields',
	        message: 'All four player aliases are required'
	      });
	    }

	    // Validate user_player is valid (1-4)
	    if (user_player === undefined || user_player === null) {
	      return reply.status(400).send({
	        error: 'Missing user_player',
	        message: 'user_player is required (1-4)'
	      });
	    }

	    if (user_player < 1 || user_player > 4) {
	      return reply.status(400).send({
	        error: 'Invalid user_player',
	        message: 'user_player must be between 0 and 4 (0=spectator, 1-4=player position)'
	      });
	    }

	    // Check if aliases are unique
	    const aliases = [player1_alias, player2_alias, player3_alias, player4_alias];
	    const uniqueAliases = new Set(aliases);
	    if (uniqueAliases.size !== 4) {
	      return reply.status(400).send({
	        error: 'Duplicate aliases',
	        message: 'All player aliases must be unique'
	      });
	    }

	    // Insert the new tournament into the database	
	    const result = await db.run(
	      `INSERT INTO tournaments 
	       (userid, player1_alias, player2_alias, player3_alias, player4_alias, user_player) 
	       VALUES (?, ?, ?, ?, ?, ?)`,
	      [userId, player1_alias, player2_alias, player3_alias, player4_alias, user_player]
	    );

	    // Get the newly created tournament with all fields
	    const tournament = await db.get(
	      `SELECT * FROM tournaments WHERE tournamentid = ?`,
	      [result.lastID]
	    );

	    return reply.status(201).send({
	      message: 'Tournament created successfully',
	      tournament: tournament
	    });

	  } catch (error) {
	    fastify.log.error('Error creating tournament:', error);
	    return reply.status(500).send({
	      error: 'Internal Server Error',
	      message: 'Failed to create tournament'
	    });
	  }
	});

}