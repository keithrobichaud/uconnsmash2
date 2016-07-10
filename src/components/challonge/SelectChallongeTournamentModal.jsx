import React from 'react';
import { Modal, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

import ChallongeActions from '../../actions/ChallongeActions';
import ChallongeStore from '../../stores/ChallongeStore';

var SelectChallongeTournamentModal = React.createClass({

  propTypes: {
    apiKey: React.PropTypes.string.isRequired,
    isOpen: React.PropTypes.bool,
    onClose: React.PropTypes.func
  },

  getInitialState: function() {
    return {tournamentId: null};
  },

  componentWillMount() {
    ChallongeStore.addChangeListener(this.onChange);
  },

  componentDidMount() {
    ChallongeActions.receiveTournaments(this.props.apiKey);
  },

  componentWillUnmount() {
    ChallongeStore.removeChangeListener(this.onChange);
  },

  onChange() {
    this.setState({
      tournaments: ChallongeStore.getTournaments()
    });
  },

  handleChange: function(event) {
    this.setState({tournamentId: event.target.value});
  },

  close() {
    this.props.onClose();
  },

  getTournamentElement: function(tournament) {
    var tournament = tournament.tournament;
    return (
      <option key={tournament.id} value={tournament.id} > {tournament.name} </option>
    );
  },

  saveAndContinue: function(e) {
    e.preventDefault()

    var data = {
      tournamentId     : this.state.tournamentId
    }

    this.props.saveValues(data)
    this.props.nextStep()
  },

  render: function() {
    if (this.state && this.state.tournaments) {
      var tournamentOptions = this.state.tournaments.map(tournament => { return this.getTournamentElement(tournament) });
    }

    return (
      <Modal show={this.props.isOpen} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Select tournament</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select</ControlLabel>
              <FormControl componentClass="select" ref='select' placeholder="select" onChange={this.handleChange} >
                {tournamentOptions}
              </FormControl>
            </FormGroup>
            <hr />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.saveAndContinue} disabled={!this.state.tournamentId}> Continue </Button>
          </Modal.Footer>
      </Modal>
    )
  }

});
  

module.exports = SelectChallongeTournamentModal;