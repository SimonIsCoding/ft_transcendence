// import type { DashboardData } from "../../views/dashboard";
// import { gameCurrentUserHasPlayedService } from "../gameService";
// import { howManyFriends } from "./friendsSubmenuService";

// export async function gameWonService()
// {
// 	try
// 	{
// 		const victories = await fetch('/api/game/victories', { credentials: 'include' });
// 		return result;
// 	}
// 	catch (error)
// 	{
// 		console.error('gameWonService error:', error);
// 		showErrorPopup("Error with storing the game in historial.", "popup");
// 		Router.navigate('home');
// 	}
// }

// export async function getUserDashboardDataService(): Promise<DashboardData>
// {
// 	const nbFriends = await howManyFriends();
// 	const gamesResult = await gameCurrentUserHasPlayedService();
// 	const nbGames = gamesResult!.count || 0;
// 	const victories = await gameWonService() || 0;
// 	const defeats = nbGames - victories;
// }

//     fastify.get('/games/victories', { preHandler: fastify.auth }, async (request, reply) => {
// 		const userId = request.user.id;
// 		const stmt = db.prepare("SELECT matchid, FROM matches WHERE userid == ");
// 		const users = stmt.all(userId);
// 		return reply.status(200).send(users);
// 	});