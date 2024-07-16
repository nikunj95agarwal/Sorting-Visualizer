import React, { useState, useEffect } from "react";
import "./ArrayBarRangeSlider.css";

const ArrayBarRangeSlider = ({ numberOfArrayBars, onChangeArrayBarRangeSlider }) => {
  const [arrayBars, setArrayBars] = useState(numberOfArrayBars);

  useEffect(() => {
    setArrayBars(numberOfArrayBars);
  }, [numberOfArrayBars]);

  const handleSliderChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setArrayBars(value);
    onChangeArrayBarRangeSlider(event, value);
  };

  return (
    <div className="range-slider-container">
      <p id="text-array-size">Array Size</p>
      <input
        type="range"
        id="arrayBarSlider"
        min="2"
        max="14"
        step="1"
        value={arrayBars}
        onChange={handleSliderChange}
      />
      <div className="value-label">{arrayBars}</div>
    </div>
  );
};

export default ArrayBarRangeSlider;
