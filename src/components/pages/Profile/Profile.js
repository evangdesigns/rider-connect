import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import UserMotorcycles from '../../pages/UserMotorcycle/UserMotorcycle';

import profileData from '../../../helpers/data/profileData';
import authData from '../../../helpers/data/authData';

import './Profile.scss';

class Profile extends React.Component {
  state = {
    profile: {},
  }

  getProfile = () => {
    profileData.getProfileByUid(authData.getUid())
      .then((profile) => this.setState({ profile }))
      .catch((err) => console.error('error getting profile info', err));
  }

  componentDidMount() {
    this.getProfile()
  }

  render() {
    const { profile } = this.state;
    return (
      <div className="Profile">
        <Link className="btn btn-link" to="/profile/edit"><FontAwesomeIcon icon={faEdit} size="lg" /></Link>
        <div>
          <img className="profile-image" src={profile.imageUrl} alt={profile.name} />
        </div>
        <h3>{profile.firstName} {profile.lastName}</h3>
        <UserMotorcycles />
      </div>
    );
  }
}

export default Profile;