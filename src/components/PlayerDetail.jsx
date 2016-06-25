import React, { Component } from 'react';
import PlayerActions from '../actions/PlayerActions';
import PlayerStore from '../stores/PlayerStore';

class PlayerDetail extends Component {

  constructor() {
    super();
    this.state = {
      player: {}
    }
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    PlayerStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    PlayerActions.getPlayer(this.props.params.id);
  }

  componentWillUnmount() {
    PlayerStore.removeChangeListener(this.onChange);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      player: PlayerActions.getPlayer(nextProps.params.id)
    });
  }

  onChange() {
    this.setState({
      player: PlayerStore.getPlayer(this.props.params.id)
    });
  }

  render() {
    let player;
    if (this.state.player) {
      player = this.state.player;
    }
    return (
      <div>
        { this.state.player &&
          <div>
            <h1>{player.name}</h1>
            <h3>{JSON.stringify(player)}</h3>
          </div>
        }
      </div>
    );
  }
}

export default PlayerDetail;