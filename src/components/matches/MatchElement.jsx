import React, { Component } from 'react';
import _ from 'underscore';
import { Link } from 'react-router';
import { Well } from 'react-bootstrap';

class MatchElement extends Component {
	render() {
		var match = this.props.match;
		var winnerName, loserName, winnerId, loserId;
		if (match) {
			_.each(match.participants, function (participant) {
				if (!participant) {
					debugger;
				}
				if (participant.result === 1) {
					winnerName = participant.player.name;
					winnerId = participant.player._id;
				}
				if (participant.result === 2) {
					loserName = participant.player.name;
					loserId = participant.player._id;
				}
			}, this);
		}

		return (
			<Well bsSize="small">
				<p> Winner: <Link to={`/players/${winnerId}`}>
								{winnerName}
							</Link>
					
				</p>
				<p> Loser: <Link to={`/players/${loserId}`}>
								{loserName}
							</Link>
				</p>
			</Well>
		);
	}
}

export default MatchElement;