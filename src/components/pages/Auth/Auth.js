import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import './Auth.scss';

class Auth extends React.Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    return (
      <div className="Auth">
        <center>
          <img src="https://github.com/evangdesigns/rider-connect/blob/master/src/images/placementIcon.png?raw=true" width="200" alt="RiderConnect App Logo" />
        </center>

        <button className="btn btn-primary btn-block" onClick={this.loginClickEvent}><FontAwesomeIcon icon={faGoogle} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LOGIN WITH GOOGLE</button>
      </div>
    );
  }
}

export default Auth;