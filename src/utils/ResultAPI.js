import APITools from './APITools';

export default {

  createResult: (url, result) => {
  	return APITools.executePost(url, result);
  }
}