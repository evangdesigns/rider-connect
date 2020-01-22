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

  showSidebar = (clicked) => {
    if (clicked) {
      this.setState({ sidebarOpen: true });
    }
  }

  componentWillUnmount() {
    this.removeListener();
  }
  render() {
    const { authed, sidebarOpen } = this.state;
    return (
      <div className="App">
        <Router>
          <Navbar authed={authed} showSidebar={this.showSidebar}/>
          <Sidebar isOpen={sidebarOpen} authed={authed} />
        </Router>
        <Map />
      </div>
    );
  }
}

export default App;
