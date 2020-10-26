import React from 'react';

function ColorBinsLegendUI(props) {
  const { colorScale, minValue, maxValue } = props;

  return (
    <div>
      <p>{minValue}</p>
      {colorScale.forEach((elem) => (
        <div style={{ backgroundColor: elem }}></div>
      ))}
      <p>{maxValue}</p>
    </div>
  );
}

export default ColorBinsLegendUI;
