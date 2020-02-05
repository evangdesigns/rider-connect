import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import './MotorcycleForm.scss';

class MotorcycleForm extends React.Component {
  static propTypes = {
    deleteMotorcycle: PropTypes.func,
    addMotorcycle: PropTypes.func,
    updateMotorcycle: PropTypes.func,
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
    const { updateMotorcycle, uMotoId } = this.props;
    updateMotorcycle(uMotoId, motorcycleId);
  }

  addMotoEvent = () => {
    const { motorcycleId } = this.state;
    const { addMotorcycle } = this.props;
    addMotorcycle(motorcycleId);
  }

  addOrUpdate = () => {
    const { motorcycle } = this.props;
    if (motorcycle !== 0) {
      this.updateMotoEvent();
      console.log('Im updating')
    } else {
      this.addMotoEvent()
      console.log('Im adding')
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
          )}
        }
      }

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