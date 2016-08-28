import React, { Component } from 'react';

import MatchElement from './MatchElement';

class MatchGroupView extends Component {

  getParticipantObject(participant) {
    var ladderParticipants = this.props.participants;
    var player = ladderParticipants[participant.player];

    if (player) {
      return {
        player: player,
        result: participant.result
      }
    }
  }

  getMatchElement(match) {
    var matchData = {};
    var matchParticipants = match.participants;
    var participant1 = matchParticipants[0];
    var participant2 = matchParticipants[1];
    var p1obj = this.getParticipantObject(participant1);
    var p2obj = this.getParticipantObject(participant2);
    if (p1obj && p2obj) {
      matchData.participants = [p1obj, p2obj];
      // matchData.tournament = this.props.tournament;
    }

    return <MatchElement key={match._id} match={matchData} />
  }

  render() {
    var matchElements;
    var matches = this.props.matches;
    if (matches && this.props.participants) {
      matchElements = matches.map(function(match) {
        return this.getMatchElement(match)
      }, this);
    }
    return (
      <div className="text-center">
        <h3>Matches</h3>
        {matchElements}
      </div>
    );
  }
}

export default MatchGroupView;