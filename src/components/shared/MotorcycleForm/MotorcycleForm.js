import React from 'react';
import Select from 'react-select';

import authData from '../../../helpers/data/authData';
import userMotoData from '../../../helpers/data/userMotorcycleData';

import './MotorcycleForm.scss';

class MotorcycleForm extends React.Component {
  state = {
    selectedOption: null,
    motorcycleId: '',
  }

  componentDidMount() {
    const { motorcycles, motorcycle } = this.props;
    const motoId = motorcycle.id;
    const options = motorcycles.map((motorcycle) => ({ value: `${motorcycle.id}`, label: `${motorcycle.name}` }));
    if (motoId) {
      this.setState({ motorcycleId: motoId })
      const motoInput = options.find((option) => option.value === motoId);
      this.setState({selectedOption: motoInput})
    }
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption },
      this.setState({motorcycleId: selectedOption.value})
    );
  };

  updateMotoEvent = (e) => {
    e.preventDefault();
    const { motorcycleId } = this.state;
    const { uMotoId } = this.props;
    const updatedMotorcycle = {
      motorcycleId,
      uid: authData.getUid(),
    };
    console.log(motorcycleId);
    userMotoData.updateMoto(uMotoId, updatedMotorcycle)
      .then(() => this.props.history.push('/profile'))
      .catch((errFromUpdateMoto) => console.error(errFromUpdateMoto));
  }

  saveMotoEvent = (e) => {
    e.preventDefault();
    const {motorcycleId} = this.state;
    const newMotorcycle = {
      motorcycleId,
      uid: authData.getUid(),
    };
    userMotoData.saveMoto(newMotorcycle)
      .then(() => this.props.history.push('/profile'))
      .catch((errFromAddMoto) => console.error(errFromAddMoto));
  }

  render() {
    const { motorcycleId, selectedOption } = this.state
    const { motorcycles } = this.props;
    const options = motorcycles.map((motorcycle) => ({ value: `${motorcycle.id}`, label: `${motorcycle.name}` }));
    return (
      <div>
      <Select className="Select"
      value= {selectedOption}
      defaultValue={selectedOption}
      onChange={this.handleChange}
      options={options}
      isSearchable
    />
        { motorcycleId
      ? <button className="btn btn-danger" onClick={this.updateMotoEvent}>UPDATE MOTO</button>
      : <button className="btn btn-danger" onClick={this.saveMotoEvent}>SAVE MOTO</button>
    }
      </div>
    );
  }
}

export default MotorcycleForm;