import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../../helpers/data/authData';
import profileData from '../../../helpers/data/profileData';

import './ProfileForm.scss';

class ProfileForm extends React.Component {
  static propTypes = {
    routerMaker: PropTypes.func,
    updateProfileEvent: PropTypes.func,
  }

  state = {
    profileFName: '',
    profileLName: '',
    profileImage: '',
    profileId:'',
  }

  componentDidMount() {
    const uid = authData.getUid()
    if (uid) {
      profileData.getProfileByUid(uid)
        .then((request) => {
          const profile = request;
          this.setState({ profileId:profile.id, profileFName: profile.firstName, profileLName: profile.lastName, profileImage: profile.imageUrl });
        })
        .catch((err) => console.error('error getting Profile for form', err));
    }
  }

  firstNameChange = (e) => {
    e.preventDefault();
    this.setState({ profileFName: e.target.value });
  }

  lastNameChange = (e) => {
    e.preventDefault();
    this.setState({ profileLName: e.target.value });
  }

  imageChange = (e) => {
    e.preventDefault();
    this.setState({ profileImage: e.target.value });
  }

  updateProfileEvent = (e) => {
    e.preventDefault();
    const { profileId } = this.state
    const updatedProfile = {
      firstName: this.state.profileFName,
      lastName: this.state.profileLName,
      imageUrl: this.state.profileImage,
      uid: authData.getUid(),
    };
    profileData.updateProfile(profileId, updatedProfile)
    .then(() => this.props.routerMaker())
    .catch((errFromUpdateProfile) => console.error(errFromUpdateProfile));
  }

  render() {
    const { profileFName, profileLName, profileImage } = this.state;
    return (
      <form className="ProfileForm">
        <div className="form-group">
          <label htmlFor="profile-image-url">Profile Image Url</label>
          <input
          type="text"
          className="form-control"
          id="profile-image-url"
          placeholder="Enter profile image url"
          value={profileImage}
          onChange={this.imageChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="profile-first-name">First Name</label>
          <input
          type="text"
          className="form-control"
          id="profile-first-name"
          placeholder="Enter first name"
          value={profileFName}
          onChange={this.firstNameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="profile-last-name">Last Name</label>
          <input
          type="text"
          className="form-control"
          id="profile-last-name"
          placeholder="Enter last name"
          value={profileLName}
          onChange={this.lastNameChange}
          />
        </div>
        <button className="update-profile btn btn-danger btn-block" onClick={this.updateProfileEvent}>UPDATE PROFILE</button>
      </form>
    );
  }
}

export default ProfileForm;