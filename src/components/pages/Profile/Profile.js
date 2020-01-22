import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.scss'

class Profile extends React.Component {
  render() {
    return (
      <div className="Profile">
        <h1>Profile</h1>
        <Link className="btn btn-primary" to="/profile/edit">Edit</Link>
      </div>
    );
  }
}

export default Profile;