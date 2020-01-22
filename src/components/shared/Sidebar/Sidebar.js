import React from 'react';
import {
  BrowserRouter as Rotuer,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Auth from '../../pages/Auth/Auth';
import Profile from '../../pages/Profile/Profile';
import ProfileForm from '../../pages/ProfileForm/ProfileForm';

import './Sidebar.scss'

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};


class Sidebar extends React.Component {
  render() {
    const { authed, isOpen } = this.props;
    let sidebarClassname = isOpen ? 'sidebar open' : 'sidebar';
    return (
      <div className={sidebarClassname}>
        <h1>Sidebar</h1>
          <Switch>
            <PublicRoute path="/login" exact component={Auth} authed={authed} />
            <PrivateRoute path="/profile" exact component={Profile} authed={authed} />
            <PrivateRoute path="/profile/edit" exact component={ProfileForm} authed={authed} />
            {/* <PrivateRoute path="/route/new" exact component={RouteForm} authed={authed} /> */}
          </Switch>
      </div>
    );
  }
}

export default Sidebar;