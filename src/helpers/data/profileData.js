import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getProfileByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/profile.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const allProfileObj = result.data;
      const profile = [];
      if (allProfileObj != null) {
        Object.keys(allProfileObj).forEach((profileId) => {
          const newProfile = allProfileObj[profileId];
          newProfile.id = profileId;
          profile.push(newProfile);
        });
      }
      resolve(profile[0]);
    })
    .catch((err) => {
      reject(err);
    });
});

const getProfile = (uid) => axios.get(`${baseUrl}/profile.json?orderBy="uid"&equalTo="${uid}`);

export default { getProfileByUid, getProfile };