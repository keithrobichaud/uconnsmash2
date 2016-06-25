import AppDispatcher from '../dispatcher/AppDispatcher';
import PlayerConstants from '../constants/PlayerConstants';
import PlayersAPI from '../utils/PlayersAPI';

var ladderId = '57661ba8bcb61e8a0643f231';

export default {

  recievePlayers: () => {
    PlayersAPI
      .getPlayers('http://localhost:3000/api/ladder/' + ladderId + '/players')
      .then(players => {
        AppDispatcher.dispatch({
          actionType: PlayerConstants.RECIEVE_PLAYERS,
          players: players
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: PlayerConstants.RECIEVE_PLAYERS_ERROR,
          message: message
        });
      });
  },

  getPlayer: (id) => {
    console.log('id: ' + id);
    PlayersAPI
      .getPlayer('http://localhost:3000/api/players/' + id)
      .then(player => {
        AppDispatcher.dispatch({
          actionType: PlayerConstants.RECIEVE_PLAYER,
          player: player
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: PlayerConstants.RECIEVE_PLAYER_ERROR,
          message: message
        });
      });
  }

}