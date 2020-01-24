import PropTypes from 'prop-types';

const motoShape = PropTypes.shape({
  id: PropTypes.string,
  year: PropTypes.number.isRequired,
  make: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
});

export default { motoShape };