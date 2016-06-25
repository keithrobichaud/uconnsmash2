import AppDispatcher from '../dispatcher/AppDispatcher';
import PlayerConstants from '../constants/PlayerConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _players = [];
let _player = {};

function setPlayers(players) {
  _players = players;
}

function setPlayer(player) {
  _player = player;
}

class PlayerStoreClass extends EventEmitter {

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  getPlayers() {
    return _players;
  }

  getPlayer() {
    return _player;
  }

}

const PlayerStore = new PlayerStoreClass();

// Here we register a callback for the dispatcher
// and look for our various action types so we can
// respond appropriately
PlayerStore.dispatchToken = AppDispatcher.register(action => {

  switch(action.actionType) {
    case PlayerConstants.RECIEVE_PLAYERS:
      setPlayers(action.players);
      // We need to call emitChange so the event listener
      // knows that a change has been made
      PlayerStore.emitChange();
      break

    case PlayerConstants.RECIEVE_PLAYER:
      setPlayer(action.player);
      PlayerStore.emitChange();
      break

    case PlayerConstants.RECIEVE_PLAYER_ERROR:
      alert(action.message);
      PlayerStore.emitChange();
      break

    case PlayerConstants.RECIEVE_PLAYERS_ERROR:
      alert(action.message);
      PlayerStore.emitChange();
      break

    default:
  }

});

export default PlayerStore;