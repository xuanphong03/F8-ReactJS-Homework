import PropTypes from 'prop-types';
import { useState } from 'react';

TextAreaField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

function TextAreaField({ label, id, name }) {
  const [currentValue, setCurrentValue] = useState('');
  const handleInputChange = (e) => {
    const { value: newValue } = e.target;
    setCurrentValue(newValue);
  };
  return (
    <div>
      <div className="relative w-full">
        <textarea
          value={currentValue}
          onChange={handleInputChange}
          name={name}
          rows={4}
          className={`textarea-control w-full resize-none border-b border-solid border-gray-200 px-[1px] pb-2 pt-3 text-sm outline-none`}
        ></textarea>
        <div className="absolute bottom-0 left-1/2 right-1/2 -translate-x-1/2"></div>
        <label className="absolute -top-4 left-0 text-sm" htmlFor={id}>
          {label}
        </label>
      </div>
    </div>
  );
}

export default TextAreaField;
