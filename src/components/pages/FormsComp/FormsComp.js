import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import Profile from '../Profile/Profile';
import ProfileForm from '../ProfileForm/ProfileForm';
import MotorcycleForm from '../../shared/MotorcycleForm/MotorcycleForm';

import authData from '../../../helpers/data/authData';
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

  loopMotorcycles = () => {
    const { motorcycles, userMotorcycles } = this.state;
    return(userMotorcycles.map((userMotorcycle) => {
      const selectedMotorcycle = motorcycles.find((motorcycle) => motorcycle.id === userMotorcycle.motorcycleId);
      return ((<MotorcycleForm
        key={userMotorcycle.id}
        uMotoId={userMotorcycle.id}
        motorcycle={selectedMotorcycle ? selectedMotorcycle : 0} motorcycles={motorcycles} deleteMotorcycle={this.deleteMotorcycle} />))
    }))
  }

  addMotoEvent = () => {
    const { userMotorcycles } = this.state;
    const blankMotorcycle = {
      id: 'userCycle' + Math.ceil(Math.random() * 100000000^50),
      motorcycleId:'motorcycle000',
      uid: authData.getUid(),
    }
    userMotorcycles.push(blankMotorcycle);
    this.setState(userMotorcycles);
  }

  deleteMotorcycle = (userMotorcycleId) => {
    userMotoData.deleteMoto(userMotorcycleId)
      .then(() => this.getData())
      .catch((err) => console.error('error deleting user motorcycle', err));
  }

  routerMaker = () => {
    this.props.history.push('/profile')
  }

  render() {

    return (
      <div className="FormComp">
        <Link className="close-edit btn btn-link" to="/profile"><FontAwesomeIcon icon={faTimes} size="lg" /></Link>
        {/* <Profile /> */}
        <ProfileForm routerMaker={this.routerMaker} />
        <div className="edit-motorcycles">
        {this.loopMotorcycles()}
        </div>
        <button className="add-moto btn btn-link" onClick={ this.addMotoEvent }>ADD MOTORCYCLE</button>
      </div>
    );
  }
}

export default FormComp;