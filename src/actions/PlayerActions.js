import AppDispatcher from '../dispatcher/AppDispatcher';
import PlayerConstants from '../constants/PlayerConstants';
import PlayerAPI from '../utils/PlayerAPI';

// when this gets hosted for real, the anyrank server should be running as well.
var urlBase = 'http://localhost:3000/api/';

export default {
  receivePlayersFromLadder: (ladderId) => {
    PlayerAPI
      .getPlayers(urlBase + 'ladder/' + ladderId + '/players')
      .then(players => {
        AppDispatcher.dispatch({
          actionType: PlayerConstants.RECEIVE_PLAYERS,
          players: players
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: PlayerConstants.RECEIVE_PLAYERS_ERROR,
          message: message
        });
      });
  },

  getPlayer: (id) => {
    PlayerAPI
      .getPlayer(urlBase + '/players/' + id)
      .then(player => {
        AppDispatcher.dispatch({
          actionType: PlayerConstants.RECEIVE_PLAYER,
          player: player
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: PlayerConstants.RECEIVE_PLAYER_ERROR,
          message: message
        });
      });
  }

}