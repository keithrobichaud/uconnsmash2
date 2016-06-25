import React, { Component } from 'react';
import { ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router';

class LadderCell extends Component {
  render() {
    const { player } = this.props;
    console.log(player);
    return (
      <ListGroupItem>
        <Link to={`/players/${player._id}`}>
          <h4>{player.name}</h4>
        </Link>
      </ListGroupItem>
    );
  }
}

export default LadderCell;