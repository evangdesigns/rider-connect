import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';

class Navbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
  }

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { authed } = this.props;

    const buildNavbar = () => {
      if (authed) {
        return (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <button className="nav-link" to="/routes/add">+ ROUTE</button>
            </li>
            <li className="nav-item">
              <button className="nav-link" to="/profile">PROFILE</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={this.logMeOut}>LOGOUT</button>
            </li>
          </ul>
        );
      }

      return (<ul className="navbar-nav ml-auto" to="/login">LOGIN</ul>);
    };

    return (
      <div className="Navbar">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="#">
            <img src="#" width="300" alt="RiderConnect" />
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            { buildNavbar() }
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;