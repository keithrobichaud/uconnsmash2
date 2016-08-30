import React, { Component } from 'react';
import _ from 'underscore';
import PlayerActions from '../actions/PlayerActions';
import PlayerStore from '../stores/PlayerStore';
import MatchGroupView from './matches/MatchGroupView';

var ladderId = '57c5aa6b7a8711e857b6c8bc';

class PlayerDetail extends Component {

  constructor() {
    super();
    this.state = {
      player: {},
      participants: {}
    }
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    PlayerStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
   
    PlayerActions.getPlayer(this.props.params.id);
    PlayerActions.getPlayers(ladderId);
  }

  componentWillUnmount() {
    PlayerStore.removeChangeListener(this.onChange);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      player: PlayerActions.getPlayer(nextProps.params.id),
      participants: PlayerActions.getPlayers(ladderId)
    });
  }

  onChange() {
    this.setState({
      player: PlayerStore.getPlayer(),
      participants: PlayerStore.getPlayers()
    });
  }

  render() {
    var player, matches;
    if (this.state.player) {
      player = this.state.player;
      matches = _.map(player.matches, function(match) {
        return match.match;
      });
      var participants = _.indexBy(this.state.participants, '_id');
    }
    return (
      <div>
        { this.state.player &&
          <div>
            <h1>{player.name}</h1>
            <div>
              Skill: {Math.round(100*player.trueSkill)/100}
            </div>
            <MatchGroupView matches={matches} participants={participants} />
          </div>
        }
      </div>
    );
  }
}

export default PlayerDetail;