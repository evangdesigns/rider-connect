import PropTypes from 'prop-types';

const motoShape = PropTypes.shape({
  id: PropTypes.string,
  motorcycleId: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

export default { motoShape };