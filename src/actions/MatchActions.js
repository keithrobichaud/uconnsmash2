import AppDispatcher from '../dispatcher/AppDispatcher';
import MatchConstants from '../constants/MatchConstants';
import MatchAPI from '../utils/MatchAPI';

// when this gets hosted for real, the anyrank server should be running as well.
var urlBase = 'http://localhost:3000/api/';

export default {
  createMatch: (eventId, match) => {
    MatchAPI
      .createMatch(urlBase + 'events/' + eventId + '/matches', match)
      .then(function() {
        AppDispatcher.dispatch({
          actionType: MatchConstants.CREATE_MATCH_SUCCESS,
          message: 'Match was successfully created.'
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: MatchConstants.CREATE_MATCH_ERROR,
          message: message
        });
      });
  }

}