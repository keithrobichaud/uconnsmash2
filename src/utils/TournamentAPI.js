import APITools from './APITools';

export default {
	getTournaments: (url) => {
		return APITools.executeGet(url);
	},

	createTournament: (url, tournament) => {
		return APITools.executePost(url, tournament);
	},

	submitTournament: (url) => {
		return APITools.executePut(url, {});
	}
}