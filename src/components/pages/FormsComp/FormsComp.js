import React from 'react';
import authData from '../../../helpers/data/authData';

import ProfileForm from '../ProfileForm/ProfileForm';
import MotorcycleForm from '../../shared/MotorcycleForm/MotorcycleForm';

import userMotoData from '../../../helpers/data/userMotorcycleData';
import motoData from '../../../helpers/data/motorcycleData';

import './FormsComp.scss';

class FormComp extends React.Component {
  state = {
    motorcycles: [],
    userMotorcycles: [],
  }

  componentDidMount() {
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

  deleteMotorcycle = (userMotorcycleId) => {
    userMotoData.deleteUserMotorcycle(userMotorcycleId)
      .then(() => this.getUserMotorcycleData(authData.getUid()))
      .catch((err) => console.error('error deleting user motorcycle', err));
  }


  render() {
    const loopMotorcycles = () => {
      const { motorcycles, userMotorcycles } = this.state;
      return(userMotorcycles.map((userMotorcycle) => {
        const selectedMotorcycle = motorcycles.find((motorcycle) => motorcycle.id === userMotorcycle.motorcycleId);
        return ((<MotorcycleForm key={userMotorcycle.id} uMotoId={userMotorcycle.id} motorcycle={selectedMotorcycle} motorcycles={motorcycles} deleteMotorcycle={this.deleteMotorcycle}/>))
      }))
    }

    return (
      <div className="FormComp">
        <ProfileForm />
        {loopMotorcycles()}
      </div>
    );
  }
}

export default FormComp;