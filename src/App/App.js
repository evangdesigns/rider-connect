import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConnection from '../helpers/data/connection';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Profile from '../components/pages/Profile/Profile';
import ProfileForm from '../components/pages/ProfileForm/ProfileForm';
import Auth from '../components/pages/Auth/Auth';
import Navbar from '../components/shared/Navbar/Navbar';
import './App.scss';


const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

firebaseConnection();

class App extends React.Component {
  state = {
    authed: false,
  };

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }
  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <Router>
          <Navbar authed={authed} />
          <div className="sideBar">
            <Switch>
              <PublicRoute path="/login" exact component={Auth} authed={authed} />
              <PrivateRoute path="/profile" exact component={Profile} authed={authed} />
              <PrivateRoute path="/profile/edit" exact component={ProfileForm} authed={authed} />
              {/* <PrivateRoute path="/route/new" exact component={RouteForm} authed={authed} /> */}
            </Switch>
          </div>
          </Router>
      </div>
    );
  }
}

export default App;
