import request from 'superagent/lib/client';

// import AuthStore from '../stores/AuthStore';

// TODO: Implement authentication for puts/deletes/etc

export default {

	executeGet: (url) => {
		return new Promise((resolve, reject) => {
			request
				.get(url)
				.end((err, response) => {
					if (err) reject(err);
					resolve(JSON.parse(response.text));
				})
		})
	},

	executePost: (url, data) => {
		return new Promise((resolve, reject) => {
			request
				.post(url)
				.send(data)
				.end((err, response) => {
					if (err) reject(err);
					resolve(response);
				})
		})
	}

}