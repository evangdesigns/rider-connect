import React from 'react';
import authData from '../../../helpers/data/authData';
import userMotoData from '../../../helpers/data/userMotorcycleData';
import motoData from '../../../helpers/data/motorcycleData';

import Motorcycle from '../../shared/Motorcycle/Motorcycle';
import './UserMotorcycle.scss';

class UserMotorcycles extends React.Component {
  state = {
    motorcycles: [],
    userMotorcycles: [],
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    motoData.getAllMotorcycles()
      .then((motorcycles) => {
        userMotoData.getUserMotorcyclesByUid(authData.getUid())
          .then((userMotorcycles) => this.setState({ userMotorcycles, motorcycles }));
      })
      .catch((err) => console.error('error getting all motorcycles', err));
  }

  render() {
    const buildMotorcycles = () => {
      const { motorcycles, userMotorcycles } = this.state;
      return (userMotorcycles.map((userMotorcycle) => {
        const selectedMotorcycle = motorcycles.find((motorcycle) => motorcycle.id === userMotorcycle.motorcycleId);
        return ((<Motorcycle key={userMotorcycle.id} motorcycle={selectedMotorcycle} />))
      }))
    }

    return (
      <div className="UserMotorcycles justify-content-center">
        {buildMotorcycles()}
      </div>
    );
  }
}

export default UserMotorcycles;