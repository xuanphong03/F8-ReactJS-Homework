import PropTypes from 'prop-types';

Button.propTypes = {
  content: PropTypes.string.isRequired,
  isSolid: PropTypes.bool,
};

function Button({ content, isSolid }) {
  return (
    <button
      className={`h-10 rounded-md px-6 py-3 text-xs font-semibold uppercase tracking-wider transition-all ${isSolid ? 'bg-primaryColor text-white hover:shadow-xl' : 'bg-white text-primaryColor hover:bg-gray-200'}`}
    >
      {content}
    </button>
  );
}

export default Button;
