import React, { Component } from 'react';

import TournamentsPageView from '../components/TournamentsPageView'

class TournamentsPage extends Component {


	render() {
		return (
			<div>
				<h1>Tournaments</h1>
				<TournamentsPageView />
			</div>
		);
	}
}

export default TournamentsPage;