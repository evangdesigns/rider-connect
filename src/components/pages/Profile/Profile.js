import React from 'react';
import { Link } from 'react-router-dom';
// import UserMotorcycles from '../../pages/UserMotorcycles/UserMotorcycles';

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
    console.log(profile);
    return (
      <div className="Profile">
        <Link className="btn btn-link" to="/profile/edit">EDIT</Link>
        <div>
          <img src={profile.imageUrl} alt={profile.name} />
        </div>
        <h3>{profile.firstName} {profile.lastName}</h3>
        <hr />
        <div className="User Motorcycles">
        {/* <UserMotorcycles /> */}
        </div>
      </div>
    );
  }
}

export default Profile;