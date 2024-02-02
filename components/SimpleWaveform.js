import React from 'react';
import Svg, { Rect } from 'react-native-svg';

const SimpleWaveform = ({ samples }) => {
  const sampleWidth = 2; // Width of each sample rectangle
  const gap = 1; // Gap between samples

  return (
    <Svg height="100" width={(sampleWidth + gap) * samples.length}>
      {samples.map((sample, index) => (
        <Rect
          key={index}
          x={index * (sampleWidth + gap)}
          y={50 - sample * 25} // Adjust Y to center the waveform vertically
          width={sampleWidth}
          height={sample * 50} // Sample value affects height
          fill="blue"
        />
      ))}
    </Svg>
  );
};

export default SimpleWaveform;
