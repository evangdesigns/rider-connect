import firebase from 'firebase/app';
import apiKeys from '../apiKeys.json';

const firebaseApp = () => {
  if (!firebase.apps.lemgth) {
    firebase.initializeApp(apiKeys.firebaseKeys);
  }
};

export default firebaseApp;
