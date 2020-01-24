import React from 'react';
import PropTypes from 'prop-types';
import authData from '../../../helpers/data/authData';
import userMotoData from '../../../helpers/data/userMotorcycleData';
import motoData from '../../../helpers/data/motorcycleData';

import Motorcycle from '../../shared/Motorcycle/Motorcycle';
import './UserMotorcycle.scss';

class UserMotorcycles extends React.Component {
  static propTypes = {
    deleteMotorcycle: PropTypes.func,
  }

  state = {
    motorcycles: [],
    userMotorcycles: [],
  }

  componentDidMount() {
    // this.getUserMotorcycleData();
    // this.getAllMotorcycles();

    this.getData();
  }

  getData =() => {
    motoData.getAllMotorcycles()
      .then((motorcycles) => {
        userMotoData.getUserMotorcyclesByUid(authData.getUid())
          .then((userMotorcycles) => this.setState({ userMotorcycles, motorcycles }));
      })
      .catch((err) => console.error('error getting all motorcycles', err));
  }

  // getUserMotorcycleData = () => {
  //   userMotoData.getUserMotorcyclesByUid(authData.getUid())
  //     .then((userMotorcycles) => this.setState({ userMotorcycles }))
  //     .catch((err) => console.error('error getting user motorcycles', err));
  //   }

  // getAllMotorcycles = () => {
  //   motoData.getAllMotorcycles()
  //     .then((motorcycles) => this.setState({ motorcycles }))
  //     .catch((err) => console.error('error getting all motorcycles', err));
  //   }

  deleteMotorcycle = (userMotorcycleId) => {
    userMotoData.deleteUserMotorcycle(userMotorcycleId)
      .then(() => this.getUserMotorcycleData(authData.getUid()))
      .catch((err) => console.error('error deleting user motorcycle', err));
  }

  render() {
    const buildMotorcycles = () => {
      const { motorcycles, userMotorcycles } = this.state;
      return(userMotorcycles.map((userMotorcycle) => {
        const selectedMotorcycle = motorcycles.find((motorcycle) => motorcycle.id === userMotorcycle.motorcycleId);
        return ((<Motorcycle key={userMotorcycle.id} motorcycle={selectedMotorcycle} deleteMotorcyle={this.deleteMotorcycle} />))
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