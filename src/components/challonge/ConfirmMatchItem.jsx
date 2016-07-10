import React from 'react';
import { ListGroupItem } from 'react-bootstrap'


var ConfirmMatchItem = React.createClass({

	propTypes: {
		winner: React.PropTypes.string,
		loser: React.PropTypes.string
	},

	// getInitialState: function() {
	// 	return {ladderPlayerName: 'none'};
	// },


	componentDidMount() {
		// this.guessTag();
	},

	render: function() {
		
		return (
			<ListGroupItem>
				<div class='text-success'> Winner: {this.props.winner} </div>
				<div class='text-danger'> Loser: {this.props.loser} </div>
			</ListGroupItem>
		);
	}

});

module.exports = ConfirmMatchItem;