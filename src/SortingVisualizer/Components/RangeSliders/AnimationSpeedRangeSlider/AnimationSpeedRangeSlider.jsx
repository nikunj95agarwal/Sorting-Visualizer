import React, { useState, useEffect } from "react";
import "./AnimationSpeedRangeSlider.css";

const AnimationSpeedRangeSlider = ({ animationSpeed, onChangeAnimationSpeedRangeSlider }) => {
  const [speed, setSpeed] = useState(animationSpeed);

  useEffect(() => {
    setSpeed(animationSpeed);
  }, [animationSpeed]);

  const handleSliderChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setSpeed(value);
    onChangeAnimationSpeedRangeSlider(event, value);
  };

  return (
    <div className="range-slider-container">
      <p id="text-animation-speed">Animation Speed (ms)</p>
      <input
        type="range"
        id="animationSpeedSlider"
        min="10"
        max="200"
        value={speed}
        onChange={handleSliderChange}
      />
      <div className="value-label">{210 - speed} ms</div>
    </div>
  );
};

export default AnimationSpeedRangeSlider;
