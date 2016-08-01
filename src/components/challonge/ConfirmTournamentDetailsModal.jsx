import React from 'react';
import { Modal, ListGroup, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap'

import TournamentActions from '../../actions/TournamentActions';
import TournamentStore from '../../stores/TournamentStore';
import PlayerActions from '../../actions/PlayerActions';
import PlayerStore from '../../stores/PlayerStore';

import ConfirmMatchItem from './ConfirmMatchItem';

var ConfirmTournamentDetailsModal = React.createClass({

  propTypes: {
    apiKey: React.PropTypes.string,
    isOpen: React.PropTypes.bool,
    onClose: React.PropTypes.func
  },

  getInitialState: function() {
    var tournament = this.props.fieldValues.tournament.details;
    return {
      players: null,
      tournamentName: tournament.name
      // tournamentDate: tournament.started_at
    };
  },

  componentWillMount() {
    PlayerStore.addChangeListener(this.onChange);
    TournamentStore.addChangeListener(this.onChange);
  },

  componentDidMount() {
    PlayerActions.getPlayers(this.props.apiKey);
  },

  componentWillUnmount() {
    PlayerStore.removeChangeListener(this.onChange);
    TournamentStore.removeChangeListener(this.onChange);
  },

  onChange() {
    this.setState({
      players: PlayerStore.getPlayers(),
      newTournament: TournamentStore.getNewTournament()
    });
  },

  close() {
    this.props.onClose();
  },

  getNameString(str) {
    if (str.slice(0,4) === 'new-') {
      return str.slice(4);
    } else {
      var players = this.props.fieldValues.ladderPlayers;
      for (var i = 0; i < players.length; i++) {
        var player = players[i];
        if (player._id === str) {
          return player.name;
        }
      }
    }
  },

  getMatchElement: function(match, id) {
    var winner = this.getNameString(match.winnerId);
    var loser = this.getNameString(match.loserId);

    return (
      <ConfirmMatchItem key={id} winner={winner} loser={loser} />
    );
  },


  saveAndContinue: function() {

    // Create new matches
    var matches = this.props.fieldValues.ladderMatches;
    matches = Object.keys(matches).map(function (key) {

      return {
        participants: [
          {
            player: matches[key].winnerId,
            result: 1
          },
          {
            player: matches[key].loserId,
            result: 2
          }
        ]
      }
    });

    // Create new tournament
    var tournament = {name: this.state.tournamentName}
    TournamentActions.createTournamentWithMatches(this.props.ladderId, tournament, matches);

    this.props.nextStep()
  },

  handleNameChange: function(event) {
    this.setState({tournamentName: event.target.value});
  },

  handleDateChange: function(event) {
    this.setState({tournamentDate: event.target.value});
  },

  getPlayerMap() {
    PlayerActions.getPlayers(this.props.ladderId);
    console.log(this.state.ladderPlayerMap);
    for (let challongePlayerName in this.state.ladderPlayerMap) {
      var ladderPlayer, ladderPlayerName, ladderPlayerId, challongePlayer, challongePlayerId;
      ladderPlayerId = null;

      ladderPlayerName = this.state.ladderPlayerMap[challongePlayerName];

      if (ladderPlayerName === 'none') {
        continue;
      }

      for (var i = 0; i < this.state.ladderPlayers.length; i++) {
        ladderPlayer = this.state.ladderPlayers[i];
        if (ladderPlayer.name === ladderPlayerName) {
          ladderPlayerId = ladderPlayer._id
        }
      }

      for (var i = 0; i < this.state.tournament.participants.length; i++) {
        challongePlayer = this.state.tournament.participants[i].participant;
        if (challongePlayer.name == challongePlayerName) {
          challongePlayerId = challongePlayer.id
        }
      }
      var obj = this.state.ladderToParticipantMap;
      if (ladderPlayerId) {
        obj[challongePlayerId] = ladderPlayerId;
      }

      this.setState({
        ladderToParticipantMap: obj
      })
    }
    console.log(this.state.ladderToParticipantMap);
    this.getMatches();
  },

  getMatches() {
    this.state.tournament.matches.forEach(match => {
      var match = match.match;
      var winnerId = match.winner_id;
      var loserId = match.loser_id;
      var score = match.scores_csv;

      //if both ids are in
      var playerMap = this.state.ladderToParticipantMap;
      if (playerMap.hasOwnProperty(winnerId) && playerMap.hasOwnProperty(loserId)) {

        //add match to ladderMatches
        var obj = this.state.ladderMatches;
        obj[match.id] = {
          winnerId: playerMap[winnerId],
          loserId: playerMap[loserId],
          score: score
        };
        this.setState({
          ladderMatches: obj
        });
      }
    })
  },


  render: function() {
    if (this.props.ladderMatches) {
      var matches = Object.keys(this.props.ladderMatches).map(function(key) {
          return this.getMatchElement(this.props.ladderMatches[key], key);
      }, this);

    }

    return (
      <Modal show={this.props.isOpen} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Review details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <h3>Tournament Details </h3>
            <FormGroup controlId="formBasicText" >
              <ControlLabel>Name</ControlLabel>
              <FormControl
                type="text"
                value={this.state.tournamentName}
                placeholder="Enter name"
                onChange={this.handleNameChange}
              />
            </FormGroup>
          </form>
          <hr/>
          <h3> Matches </h3>
          <ListGroup>
            {matches}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.previousStep} disabled={false}> Back </Button>
          <Button onClick={this.saveAndContinue} disabled={false}> Continue </Button>
        </Modal.Footer>
      </Modal>
    )
  }

});
  

module.exports = ConfirmTournamentDetailsModal;