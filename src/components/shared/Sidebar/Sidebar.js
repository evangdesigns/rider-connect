import React from 'react';
import {
  BrowserRouter as Rotuer,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Auth from '../../pages/Auth/Auth';
import Profile from '../../pages/Profile/Profile';
import FormsComp from '../../pages/FormsComp/FormsComp';
import RouteForm from '../../pages/RouteForm/RouteForm';

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
  static propTypes = {
    authed: PropTypes.bool,
    openSidebar: PropTypes.func,
    closeSidebar: PropTypes.func,
  }

  render() {
    const { authed, isOpen, coords } = this.props;
    let sidebarClassname = isOpen ? 'sidebar open' : 'sidebar';
    return (
      <div className={sidebarClassname}>
          <Switch>
            <PublicRoute path="/login" exact component={Auth} authed={authed} />
            <PrivateRoute path="/profile" exact component={Profile} authed={authed} />
            <PrivateRoute path="/profile/edit" exact component={FormsComp} authed={authed} />
            <PrivateRoute path="/routes/new" exact component={RouteForm} authed={authed} coords={coords} clcloseSidebar={this.closeSidebar} />
          </Switch>
      </div>
    );
  }
}

export default Sidebar;