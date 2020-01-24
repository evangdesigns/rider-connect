import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllMotorcycles = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/motorcycles.json`)
    .then((result) => {
      const allMotorcyclesObj = result.data;
      const motorcycles = [];
      if (allMotorcyclesObj != null) {
        Object.keys(allMotorcyclesObj).forEach((motorcycleId) => {
          const newMotorcycle = allMotorcyclesObj[motorcycleId];
          newMotorcycle.id = motorcycleId;
          motorcycles.push(newMotorcycle);
        });
      }
      resolve(motorcycles);
    })
    .catch((err) => {
      reject(err);
    });
});

export default { getAllMotorcycles };