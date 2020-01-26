import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getUserMotorcyclesByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/usermotorcycle.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const allUserMotorcyclesObj = result.data;
      const userMotorcycles = [];
      if (allUserMotorcyclesObj != null) {
        Object.keys(allUserMotorcyclesObj).forEach((UserMotorcycleId) => {
          const newUserMotorcycle = allUserMotorcyclesObj[UserMotorcycleId];
          newUserMotorcycle.id = UserMotorcycleId;
          userMotorcycles.push(newUserMotorcycle);
        });
      }
      resolve(userMotorcycles);
    })
    .catch((err) => {
      reject(err);
    });
});

const addMoto = (motoInfo) => axios.post(`${baseUrl}/usermotorcycle.json`, motoInfo);

const updateMoto = (uMotoId, updatedMotorcycle) => axios.put(`${baseUrl}/usermotorcycle/${uMotoId}.json`, updatedMotorcycle);

const deleteMoto = (uMotoId) => axios.delete(`${baseUrl}/usermotorcycle/${uMotoId}.json`);

export default {
  getUserMotorcyclesByUid,
  addMoto,
  updateMoto,
  deleteMoto,
};