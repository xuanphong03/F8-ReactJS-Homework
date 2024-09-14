import PropTypes from 'prop-types';
import { useState } from 'react';

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

function InputField({ id, type, name, label, placeholder }) {
  const [currentValue, setCurrentValue] = useState('');

  const handleInputChange = (e) => {
    const { value: newValue } = e.target;
    setCurrentValue(newValue);
  };

  return (
    <div>
      <div className="relative w-full">
        <input
          id={id}
          value={currentValue}
          onChange={handleInputChange}
          type={type}
          name={name}
          placeholder={placeholder}
          className={`input-control w-full border-b border-solid border-gray-200 px-[1px] pb-2 pt-3 text-sm outline-none`}
        />
        <div className="absolute bottom-0 left-1/2 right-1/2 -translate-x-1/2"></div>
        <label className="absolute -top-4 left-0 text-sm" htmlFor={id}>
          {label}
        </label>
      </div>
    </div>
  );
}

export default InputField;
