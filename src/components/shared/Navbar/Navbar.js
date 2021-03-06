import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';

class Navbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
    openSidebar: PropTypes.func,
    closeSidebar: PropTypes.func,
  }

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
    this.props.closeSidebar();
  }

  render() {
    const { authed } = this.props;

    const buildNavbar = () => {
      if (authed) {
        return (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/routes/new" onClick={this.props.openSidebar}>+ ADD ROUTE</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile" onClick={this.props.toggelSidebar}>PROFILE</Link>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={this.logMeOut}>LOGOUT</button>
            </li>
          </ul>
        );
      }

      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/login" onClick={this.props.openSidebar}>LOGIN</Link>
          </li>
        </ul>
      );
    };

    return (
      <div className="Navbar">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" onClick={this.props.closeSidebar} to="/">
            <img src="https://github.com/evangdesigns/rider-connect/blob/master/src/images/riderConnect_navLogo.png?raw=true" width="200" alt="RiderConnect" />
          </Link>
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