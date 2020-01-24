import React from 'react';

import motoShape from '../../../helpers/propz/motoShape';

import './Motorcycle.scss';

class Motorcycle extends React.Component {
  static propTypes = {
    motorcycles: motoShape.motoShape,
  }

  render() {
    const { motorcycle } = this.props;

    return (
      <div className="Motorcycle media align-middle">
        <div className="media-body">
          <h6 className="motorcycle-title">{motorcycle.year}</h6>
          <p>{motorcycle.make}</p>
          <p>{motorcycle.model}</p>
        </div>
        <img src={motorcycle.imageUrl} alt={motorcycle.model} />
      </div>
    );
  }
}

export default Motorcycle;