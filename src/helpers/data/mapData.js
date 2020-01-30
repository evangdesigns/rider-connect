import axios from 'axios';

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

export default { matchRouteRequest };