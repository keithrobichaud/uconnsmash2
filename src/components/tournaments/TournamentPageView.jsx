import React, { Component } from 'react';
import _ from 'underscore';
import {Table} from 'react-bootstrap';
import TournamentActions from '../../actions/TournamentActions';
import TournamentStore from '../../stores/TournamentStore';

class TournamentPageView extends Component {

	constructor() {
		super();
		this.state = {
			tournament: null
		}
		this.onChange = this.onChange.bind(this);
	}

	componentWillMount() {
		TournamentStore.addChangeListener(this.onChange);
	}

	componentDidMount() {
		TournamentActions.getTournament(this.props.params.id);
	}

	componentWillUnmount() {
		TournamentStore.removeChangeListener(this.onChange);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			tournament: TournamentActions.getTournament(nextProps.params.id)
		});
	}

	onChange() {
		this.setState({
			tournament: TournamentStore.getTournament(this.props.params.id)
		});
	}

	getResultRow(player) {
		return (
			<tr key={player.id}>
				<td>{player.placement}</td>
				<td>{player.name}</td>
			</tr>
		);
	}

	render() {
		let tournament;
		var resultTable, matchTable;
		if (this.state.tournament) {
			tournament = this.state.tournament;
			// var matches = tournament.matches;
			var results = _.sortBy(tournament.results, result => result.placement);
			var participants = _.indexBy(tournament.participants, '_id');

			var resultItems = results.map(result => {
				var playerId = result.player;
				if (participants[playerId]) {
					var player = {
						id: playerId,
						name: participants[playerId].name,
						placement: result.placement
					};
					return this.getResultRow(player);
				}
			}, this);

			if (resultItems.length > 0) {
				resultTable = <Table striped bordered condensed hover>
								<thead>
									<tr>
										<th>#</th>
										<th>Tag</th>
									</tr>
								</thead>
								<tbody>
									{resultItems}
								</tbody>
							</Table>;
			}
		}

		return (
			<div>
				{ this.state.tournament &&
					<div>
						<h1>{tournament.name}</h1>
						<div className="col-sm-3">
							{resultTable}
						</div>
						<div className="col-sm-6">
							{matchTable}
						</div>
					</div>
				}
			</div>
		);
	}
}

export default TournamentPageView;