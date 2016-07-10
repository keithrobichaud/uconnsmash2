import APITools from './APITools';

export default {

  getTournaments: (url) => {
    return APITools.executeGet(url);
  },

  getTournament: (url) => {
    return APITools.executeGet(url);
  }
}