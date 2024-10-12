import React, { useState } from "react";
import PropTypes from "prop-types";

SliderScore.propTypes = {};

function SliderScore() {
  const [value, setValue] = useState(0);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div></div>
  );
}

export default SliderScore;
