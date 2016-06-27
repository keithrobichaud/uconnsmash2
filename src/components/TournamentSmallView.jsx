import React, { Component } from 'react';
import { ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router';

class TournamentSmallView extends Component {
  render() {
    const { tournament } = this.props;
    return (
      <ListGroupItem>
        <Link to={`/tournaments/${tournament._id}`}>
          <h4>{tournament.name}</h4>
          <h5>{tournament.date}</h5>
        </Link>
      </ListGroupItem>
    );
  }
}

export default TournamentSmallView;