import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConnection from '../helpers/data/connection';
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from '../components/shared/Navbar/Navbar';
import Sidebar from '../components/shared/Sidebar/Sidebar';
import Map from '../components/pages/Map/Map';
import './App.scss';

firebaseConnection();

class App extends React.Component {
  state = {
    authed: false,
    sidebarOpen: false,
    coords: {},
  };

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
        this.setState({ sidebarOpen: false })
      } else {
        this.setState({ authed: false });
      }
    });
  }

  openSidebar = () => {
    const { sidebarOpen } = this.state;
    if (sidebarOpen === false) {
      this.setState({ sidebarOpen: true })
    }
  }

  closeSidebar = () => {
    const { sidebarOpen } = this.state;
    if (sidebarOpen === true) {
      this.setState({ sidebarOpen: false })
    }
  }

  toggelSidebar = () => {
    this.setState(prevState => ({
      sidebarOpen: !prevState.sidebarOpen
    }));
  }

  setCoords = (coords) => {
    this.setState({coords: coords})
  }

  componentWillUnmount() {
    this.removeListener();
  }
  render() {
    const { authed, sidebarOpen, coords } = this.state;
    return (
      <div className="App">
        <Router>
            <Navbar authed={authed} toggelSidebar={this.toggelSidebar} openSidebar={this.openSidebar} closeSidebar={this.closeSidebar} />
            <Sidebar openSidebar={this.openSidebar} isOpen={sidebarOpen} authed={authed} coords={coords}/>
        </Router>
        <Map setCoords={this.setCoords}/>
      </div>
    );
  }
}

export default App;
