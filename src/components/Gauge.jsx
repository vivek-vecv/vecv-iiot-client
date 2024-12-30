import { useEffect, useState } from 'react';
import GaugeComponent from 'react-gauge-component';

export default function Gauge({ heading, min, max, value, totalTicks, type, alertMessage }) {
  // // Send an alert
  // const sendAlert = () => {
  //   alert(`${value} is beyond the range`);
  // };

  // if (value < min || value > max) {
  //   sendAlert();
  // }

  // Generate ticks dynamically based on the number of ticks
  const generateTicks = (min, max, totalTicks) => {
    const step = (max - min) / (totalTicks - 1); // Calculate the step size
    const ticks = [];
    for (let i = 0; i < totalTicks; i++) {
      ticks.push({ value: parseFloat((min + i * step).toFixed(2)) }); // Round to 2 decimal places
    }
    return ticks;
  };

  // Generate arcs dynamically based on ticks
  const generateArcs = (ticks) => {
    const arcs = [];
    for (let i = 0; i < ticks.length - 1; i++) {
      arcs.push({ limit: ticks[i + 1].value });
    }
    return arcs;
  };

  const ticks = generateTicks(min, max, totalTicks);
  const step = parseFloat(((max - min) / (totalTicks - 1)).toFixed(2)); // Round step to 2 decimal places
  const arcs = generateArcs(ticks);

  return (
    <div className="shadow-lg p-3 rounded-xl border border-gray-300" data-gauge>
      <GaugeComponent
        minValue={min}
        maxValue={max}
        value={value}
        valueTextStyle={{
          fill: '#ff5722', // Set the desired color (e.g., orange)
          fontSize: '24px', // Adjust the font size
          fontWeight: 'bold', // Make the text bold
        }}
        valueTextFontSize="16px"
        labelTextStyle={{
          fill: '#4a5568', // Label color
          fontSize: '16px',
        }}
        type={type || 'radial'}
        labels={{
          tickLabels: {
            type: 'outer',
            ticks, // Dynamically generated ticks
          },
        }}
        arc={{
          colorArray: ['#5BE12C', '#F5C518', '#EA4228'], // Color array for arcs
          subArcs: arcs, // Sub-arcs generated from ticks
          padding: 0.02,
          width: 0.2,
        }}
        pointer={{
          animationDelay: 200,
        }}
      />
      <h3 className="text-center">{heading}</h3>
    </div>
  );
}
