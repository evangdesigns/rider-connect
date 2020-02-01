import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import UserMotorcycles from '../../pages/UserMotorcycle/UserMotorcycle';

import firebase from 'firebase/app';
import 'firebase/auth';

import profileData from '../../../helpers/data/profileData';
import authData from '../../../helpers/data/authData';

import './Profile.scss';

class Profile extends React.Component {
  state = {
    profile: {},
    user: {},
  }

  getProfile = () => {
    profileData.getProfileByUid(authData.getUid())
      .then((profile) => this.setState({ profile }))
      .catch((err) => console.error('error getting profile info', err));
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
    this.getProfile();
    this.setState({ user });
      }
    });
  };

  render() {
    const { user } = this.state;
    return (
      <div className="Profile">
        <Link className="btn btn-link" to="/profile/edit"><FontAwesomeIcon icon={faEdit} size="lg" /></Link>
        <div>
          <img className="profile-image" src={user.photoURL} alt={user.displayName} />
        </div>
        <h3>{user.displayName}</h3>
        <UserMotorcycles />
      </div>
    );
  }
}

export default Profile;