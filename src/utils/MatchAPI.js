import APITools from './APITools';

export default {

  createMatch: (url, match) => {
  	return APITools.executePost(url, match);
  }
}