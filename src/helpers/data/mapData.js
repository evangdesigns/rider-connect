import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

  const matchRouteRequest = (query) => new Promise((resolve, reject) => {
    axios.get(query)
      .then((results) => {
        resolve(results.data);
        console.log(results.data)
      })
      .catch((err) => {
        reject(err);
      });
  });

  const getAllRoutes = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/route.json`)
    .then((result) => {
      const allRoutesObj = result.data;
      const routes = [];
      if (allRoutesObj != null) {
        Object.keys(allRoutesObj).forEach((routeId) => {
          const newRoute = allRoutesObj[routeId];
          newRoute.id = routeId;
          routes.push(newRoute);
        });
      }
      resolve(routes);
    })
    .catch((err) => {
      reject(err);
    });
});

const addRoute = (routeInfo) => axios.post(`${baseUrl}/route.json`, routeInfo);

const updateRoute = (routeId, updatedRoute) => axios.put(`${baseUrl}/route/${routeId}.json`, updatedRoute);

const deleteRoute = (routeId) => axios.delete(`${baseUrl}/route/${routeId}.json`);

export default { matchRouteRequest, getAllRoutes, addRoute, updateRoute, deleteRoute };