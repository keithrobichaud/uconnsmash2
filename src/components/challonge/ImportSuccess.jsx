import React from 'react';
import { Alert, Button } from 'react-bootstrap';

var ImportSuccess = React.createClass({
  getInitialState() {
    return {
      alertVisible: true
    };
  },

  handleAlertDismiss() {
    this.setState({alertVisible: false});
    this.props.onClose()
  },

  handleAlertShow() {
    this.setState({alertVisible: true});
  },

  render() {
    if (this.state.alertVisible) {
      return (
        <Alert bsStyle="success" onDismiss={this.handleAlertDismiss}>
          <h4>Aww yeah!</h4>
          <p>Congrats! Tournament imported successfully.</p>
          <p>
            <Button onClick={this.handleAlertDismiss}>Close</Button>
          </p>
        </Alert>
      );
    }
    return null;
  }
});

module.exports = ImportSuccess;