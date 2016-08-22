import AppDispatcher from '../dispatcher/AppDispatcher';
import ResultConstants from '../constants/ResultConstants';
import ResultAPI from '../utils/ResultAPI';

// when this gets hosted for real, the anyrank server should be running as well.
var urlBase = 'http://uconnsmash.com:3000/api/';

export default {
  createResult: (eventId, result) => {
    ResultAPI
      .createResult(urlBase + 'events/' + eventId + '/results', result)
      .then(function() {
        AppDispatcher.dispatch({
          actionType: ResultConstants.CREATE_RESULT_SUCCESS,
          message: 'Result was successfully created.'
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: ResultConstants.CREATE_RESULT_ERROR,
          message: message
        });
      });
  }

}