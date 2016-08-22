import React, { Component } from 'react';

import TournamentPageView from '../components/tournaments/TournamentPageView'

class TournamentPage extends Component {


	render() {
		return (
			<div>
				<TournamentPageView {...this.props} />
			</div>
		);
	}
}

export default TournamentPage;