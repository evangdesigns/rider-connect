import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import authData from '../../../helpers/data/authData';
import userMotoData from '../../../helpers/data/userMotorcycleData';

import './MotorcycleForm.scss';

class MotorcycleForm extends React.Component {
  static propTypes = {
    deleteMotorcycle: PropTypes.func,
  }

  state = {
    selectedOption: null,
    motorcycleId: '',
  }

  componentDidMount() {
    const { motorcycles, motorcycle } = this.props;
    const options = motorcycles.map((m) => ({ value: `${m.id}`, label: `${m.name}` }));
    const motoId = motorcycle.id;
    if (motoId) {
      this.setState({ motorcycleId: motoId })
      const motoInput = options.find((option) => option.value === motoId);
      this.setState({selectedOption: motoInput})
    }
  };

  updateMotoEvent = () => {
    const { motorcycleId } = this.state;
    const { uMotoId } = this.props;
    const updatedMotorcycle = {
      motorcycleId,
      uid: authData.getUid(),
    };
    userMotoData.updateMoto(uMotoId, updatedMotorcycle)
      .then()
      .catch((errFromUpdateMoto) => console.error(errFromUpdateMoto));
  }

  addMotoEvent = () => {
    const { motorcycleId } = this.state;
    const newMotorcycle = {
      motorcycleId,
      uid: authData.getUid(),
    };
    userMotoData.addMoto(newMotorcycle)
      .then()
      .catch((errFromAddMoto) => console.error(errFromAddMoto));
  }

  addOrUpdate = () => {
    const { motorcycle } = this.props;
    if (motorcycle === 0) {
      this.addMotoEvent()
    } else {
      this.updateMotoEvent();
    }
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.setState({ motorcycleId: selectedOption.value }, () => {
      this.addOrUpdate();
    })
  };

  deleteMotoEvent = (e) => {
    e.preventDefault();
    const { deleteMotorcycle, uMotoId } = this.props;
    deleteMotorcycle(uMotoId);
  }

  render() {
    const { motorcycleId, selectedOption } = this.state
    const { motorcycles } = this.props;
    const options = motorcycles.map((motorcycle) => ({ value: `${motorcycle.id}`, label: `${motorcycle.name}` }));
    const buttons = () => {
      if (selectedOption != null) {
        if (motorcycleId) {
          return(<div className="update-btn col-2"><button className="btn btn-link" onClick={this.deleteMotoEvent}><FontAwesomeIcon icon={faTrash} size="sm" /></button></div>
          )} else {
          return(<button className="update-btn col-2" onClick={this.addMotoEvent}><FontAwesomeIcon icon={faCheck} size="lg" /></button>);
        }
      }
    };

    return (
      <div className="Select">
        <Select
        className="moto-select col-10"
        value={selectedOption}
        defaultValue={selectedOption}
        options={options}
        isSearchable
        onChange={this.handleChange}
        />
        {buttons()}
      </div>
    );
  }
}

export default MotorcycleForm;