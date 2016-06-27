import APITools from './APITools';

export default {
	getTournaments: (url) => {
		return APITools.executeGet(url);
	},

	createTournament: (url, tournament) => {
		return APITools.executePost(url, tournament);
	}
}