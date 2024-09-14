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
  const [isFocused, setIsFocused] = useState(false);
  const [currentValue, setCurrentValue] = useState('');

  const handleInputChange = (e) => {
    const { value: newValue } = e.target;
    setCurrentValue(newValue);
  };

  return (
    <div>
      <label
        className={`text-sm font-medium ${isFocused ? 'text-gray-700' : 'text-[#889EA8]'}`}
        htmlFor={id}
      >
        {label}
      </label>
      <div className="w-full">
        <input
          value={currentValue}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          type={type}
          name={name}
          placeholder={placeholder}
          className={`w-full border-b border-solid px-[1px] pb-2 pt-3 text-sm outline-none ${isFocused ? 'border-gray-700' : 'border-gray-200'}`}
        />
      </div>
    </div>
  );
}

export default InputField;
