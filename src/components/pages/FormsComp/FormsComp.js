import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons'

import Profile from '../Profile/Profile';
import UserMotorcycles from '../../pages/UserMotorcycle/UserMotorcycle';
import MotorcycleForm from '../../shared/MotorcycleForm/MotorcycleForm';

import authData from '../../../helpers/data/authData';
import userMotoData from '../../../helpers/data/userMotorcycleData';
import motoData from '../../../helpers/data/motorcycleData';

import './FormsComp.scss';

class FormComp extends React.Component {
  state = {
    editMode: false,
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
        motorcycle={selectedMotorcycle ? selectedMotorcycle : 0}
        motorcycles={motorcycles}
        deleteMotorcycle={this.deleteMotorcycle}
        addMotorcycle={this.addMotorcycle}
        updateMotorcycle={this.updateMotorcycle}/>))
    }))
  }

  setEditMode = () => {
    this.setState({ editMode: !this.state.editMode });
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

  updateMotorcycle = (uMotoId, motorcycleId) => {
    const updatedMotorcycle = {
      motorcycleId,
      uid: authData.getUid(),
    };
    userMotoData.updateMoto(uMotoId, updatedMotorcycle)
      .then(() => this.getData())
      .catch((errFromUpdateMoto) => console.error(errFromUpdateMoto));
  }

  addMotorcycle = (motorcycleId) => {
    const motoInfo = {
      motorcycleId,
      uid: authData.getUid(),
    };
    userMotoData.addMoto(motoInfo)
      .then(() => this.getData())
      .catch((errFromAddMoto) => console.error(errFromAddMoto));
  }

  deleteMotorcycle = (userMotorcycleId) => {
    userMotoData.deleteMoto(userMotorcycleId)
      .then(() => this.getData())
      .catch((err) => console.error('error deleting user motorcycle', err));
  }

  renderView = () => {
    const {editMode} = this.state;
    if (editMode) {
      return (
        <div>
        <div className="edit-motorcycles">
          {this.loopMotorcycles()}
        </div>
          <button className="add-moto btn btn-link" onClick={ this.addMotoEvent }>ADD MOTORCYCLE</button>
          <Link className="update-profile btn btn-danger btn-block" to="/profile" onClick={this.setEditMode}>UPDATE PROFILE</Link>
        </div>
      );
    } else {
      return (<UserMotorcycles/>)
    }
  }

  render() {
    const { editMode } = this.state;
    return (
      <div className="FormComp">
        {editMode ? <Link className="close-edit btn btn-link" onClick={this.setEditMode} to="/profile"><FontAwesomeIcon icon={faTimes} size="lg" /></Link>
        : <Link className="open-edit btn btn-link" onClick={this.setEditMode} to="/profile/edit"><FontAwesomeIcon icon={faEdit} size="lg" /></Link>}
        <Profile />
        {this.renderView()}
      </div>
    );
  }
}

export default FormComp;