import PropTypes from 'prop-types';
import { useState } from 'react';

RadioField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

function RadioField({ id, name, label, options = [] }) {
  const [interestedService, setInterestedService] = useState(
    () => options[0].name,
  );

  const handleServiceChange = (serviceName) => {
    if (serviceName === interestedService) return;
    setInterestedService(serviceName);
  };

  return (
    <div>
      <label className="text-sm font-medium text-[#889EA8]" htmlFor={id}>
        {label}
      </label>
      <div className="mt-3 flex flex-wrap gap-4">
        {options.map(({ id, name: serviceName }) => {
          return (
            <div key={id}>
              <label
                htmlFor={serviceName}
                className="flex items-center gap-2 font-light capitalize text-gray-700"
                onClick={() => handleServiceChange(serviceName)}
              >
                <span className="flex size-5 items-center justify-center rounded-full border border-solid border-gray-400">
                  <span
                    className={`size-3 rounded-full ${interestedService === serviceName ? 'bg-gray-700' : ''}`}
                  ></span>
                </span>{' '}
                {serviceName}
              </label>
              <input
                hidden
                id={serviceName}
                type="radio"
                name={name}
                value={serviceName}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RadioField;
