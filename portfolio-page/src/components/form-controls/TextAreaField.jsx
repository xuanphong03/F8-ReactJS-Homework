import PropTypes from 'prop-types';
import { useState } from 'react';

TextAreaField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

function TextAreaField({ label, id, name }) {
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
        <textarea
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={currentValue}
          onChange={handleInputChange}
          name={name}
          rows={4}
          className={`w-full resize-none border-b border-solid px-[1px] pb-2 pt-3 text-sm outline-none ${isFocused ? 'border-gray-700' : 'border-gray-200'}`}
        ></textarea>
      </div>
    </div>
  );
}

export default TextAreaField;
