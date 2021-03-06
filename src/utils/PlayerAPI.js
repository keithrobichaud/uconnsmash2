import APITools from './APITools';

export default {

  getPlayers: (url) => {
    return APITools.executeGet(url);
  },

  getPlayer: (url) => {
    return APITools.executeGet(url);
  },

  createPlayer: (url, player) => {
  	return APITools.executePost(url, player);
  }
}