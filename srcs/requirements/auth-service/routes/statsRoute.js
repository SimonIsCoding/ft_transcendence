import db from '../src/database.js';


export async function statsRoutes(fastify)
{
	fastify.get('/games/stats/matches', { preHandler: fastify.auth }, async (req, reply) => {
	  try {
	    const userId = req.user.id;
	
	    // Get total matches
	    const totalMatches = await db.get(
	      `SELECT COUNT(*) as count FROM matches WHERE userid = ?`,
	      [userId]
	    );
	
	    // Get won matches (user is player 1 and won, or player 2 and won)
	    const wonMatches = await db.get(
	      `SELECT COUNT(*) as count FROM matches 
	       WHERE userid = ? AND is_finished = 1 
	       AND ((user_player = 1 AND score1 > score2) OR (user_player = 2 AND score2 > score1))`,
	      [userId]
	    );
	
	    // Get lost matches (user is player 1 and lost, or player 2 and lost)
	    const lostMatches = await db.get(
	      `SELECT COUNT(*) as count FROM matches 
	       WHERE userid = ? AND is_finished = 1 
	       AND ((user_player = 1 AND score1 < score2) OR (user_player = 2 AND score2 < score1))`,
	      [userId]
	    );
	
	    // Get matches in progress
	    const inProgressMatches = await db.get(
	      `SELECT COUNT(*) as count FROM matches 
	       WHERE userid = ? AND is_finished = 0`,
	      [userId]
	    );
	
	    // Get win rate
	    const totalFinished = wonMatches.count + lostMatches.count;
	    const winRate = totalFinished > 0 ? (wonMatches.count / totalFinished * 100).toFixed(1) : 0;
	
	    return reply.status(200).send({
	      total_matches: totalMatches.count,
	      won_matches: wonMatches.count,
	      lost_matches: lostMatches.count,
	      in_progress_matches: inProgressMatches.count,
	      win_rate: `${winRate}%`,
	      total_finished_matches: totalFinished
	    });
	
	  } catch (error) {
	    fastify.log.error('Error fetching match stats:', error);
	    return reply.status(500).send({
	      error: 'Internal Server Error',
	      message: 'Failed to fetch match statistics'
	    });
	  }
	});
	
	fastify.get('/games/stats/tournaments', { preHandler: fastify.auth }, async (req, reply) => {
	  try {
	    const userId = req.user.id;
	
	    // Get total tournaments
	    const totalTournaments = await db.get(
	      `SELECT COUNT(*) as count FROM tournaments WHERE userid = ?`,
	      [userId]
	    );
	
	    // Get finished tournaments
	    const finishedTournaments = await db.get(
	      `SELECT COUNT(*) as count FROM tournaments WHERE userid = ? AND is_finished = 1`,
	      [userId]
	    );
	
	    // Get tournaments where user reached final
	    const finalsReached = await db.get(
	      `SELECT COUNT(*) as count FROM tournaments t
	       WHERE t.userid = ? AND t.is_finished = 1
	       AND t.final_matchid IS NOT NULL
	       AND (t.user_player IN (1, 2, 3, 4))`, // User participated as a player
	      [userId]
	    );
	
	    // Get tournaments where user won (user's player won the final)
	    const tournamentsWon = await db.get(
	      `SELECT COUNT(*) as count FROM tournaments t
	       JOIN matches m ON t.final_matchid = m.matchid
	       WHERE t.userid = ? AND t.is_finished = 1
	       AND (
	         (t.user_player = 1 AND m.alias1 IN (t.player1_alias, t.player2_alias, t.player3_alias, t.player4_alias) AND m.score1 > m.score2) OR
	         (t.user_player = 2 AND m.alias2 IN (t.player1_alias, t.player2_alias, t.player3_alias, t.player4_alias) AND m.score2 > m.score1) OR
	         (t.user_player = 3 AND m.alias1 IN (t.player1_alias, t.player2_alias, t.player3_alias, t.player4_alias) AND m.score1 > m.score2) OR
	         (t.user_player = 4 AND m.alias2 IN (t.player1_alias, t.player2_alias, t.player3_alias, t.player4_alias) AND m.score2 > m.score1)
	       )`,
	      [userId]
	    );
	
	    // Get recent winners for the last 5 tournaments
	    const recentWinners = await db.all(
	      `SELECT t.tournamentid, 
	              CASE 
	                WHEN m.score1 > m.score2 THEN m.alias1
	                ELSE m.alias2
	              END as winner
	       FROM tournaments t
	       JOIN matches m ON t.final_matchid = m.matchid
	       WHERE t.userid = ? AND t.is_finished = 1
	       ORDER BY t.finished_at DESC
	       LIMIT 5`,
	      [userId]
	    );
	
	    // Calculate win rate
	    const winRate = finishedTournaments.count > 0 ? 
	      (tournamentsWon.count / finishedTournaments.count * 100).toFixed(1) : 0;
	
	    return reply.status(200).send({
	      total_tournaments: totalTournaments.count,
	      finished_tournaments: finishedTournaments.count,
	      tournaments_won: tournamentsWon.count,
	      finals_reached: finalsReached.count,
	      win_rate: `${winRate}%`,
	      recent_winners: recentWinners
	    });
	
	  } catch (error) {
	    fastify.log.error('Error fetching tournament stats:', error);
	    return reply.status(500).send({
	      error: 'Internal Server Error',
	      message: 'Failed to fetch tournament statistics'
	    });
	  }
	});
	
	fastify.get('/games/stats/overview', { preHandler: fastify.auth }, async (req, reply) => {
	  try {
	    const userId = req.user.id;
	
	    // Get match stats
	    const matchStats = await db.get(
	      `SELECT 
	        COUNT(*) as total_matches,
	        SUM(CASE WHEN is_finished = 1 THEN 1 ELSE 0 END) as finished_matches,
	        SUM(CASE WHEN is_finished = 0 THEN 1 ELSE 0 END) as in_progress_matches,
	        SUM(CASE WHEN (user_player = 1 AND score1 > score2) OR (user_player = 2 AND score2 > score1) THEN 1 ELSE 0 END) as wins,
	        SUM(CASE WHEN (user_player = 1 AND score1 < score2) OR (user_player = 2 AND score2 < score1) THEN 1 ELSE 0 END) as losses
	       FROM matches 
	       WHERE userid = ?`,
	      [userId]
	    );
	
	    // Get tournament stats
	    const tournamentStats = await db.get(
	      `SELECT 
	        COUNT(*) as total_tournaments,
	        SUM(CASE WHEN is_finished = 1 THEN 1 ELSE 0 END) as finished_tournaments
	       FROM tournaments 
	       WHERE userid = ?`,
	      [userId]
	    );
	
	    // Calculate percentages
	    const totalFinishedMatches = matchStats.wins + matchStats.losses;
	    const matchWinRate = totalFinishedMatches > 0 ? 
	      (matchStats.wins / totalFinishedMatches * 100).toFixed(1) : 0;
	
	    const tournamentWinRate = tournamentStats.finished_tournaments > 0 ? 
	      ((matchStats.wins || 0) / tournamentStats.finished_tournaments * 100).toFixed(1) : 0;
	
	    return reply.status(200).send({
	      matches: {
	        total: matchStats.total_matches,
	        finished: matchStats.finished_matches,
	        in_progress: matchStats.in_progress_matches,
	        wins: matchStats.wins,
	        losses: matchStats.losses,
	        win_rate: `${matchWinRate}%`
	      },
	      tournaments: {
	        total: tournamentStats.total_tournaments,
	        finished: tournamentStats.finished_tournaments,
	        win_rate: `${tournamentWinRate}%`
	      }
	    });
	
	  } catch (error) {
	    fastify.log.error('Error fetching overview stats:', error);
	    return reply.status(500).send({
	      error: 'Internal Server Error',
	      message: 'Failed to fetch overview statistics'
	    });
	  }
	});

}