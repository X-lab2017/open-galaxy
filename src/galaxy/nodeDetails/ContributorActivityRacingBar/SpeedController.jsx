import React from 'react';
import { Segmented } from 'antd';

const options = [
  {
    label: '0.5x',
    value: 0.5,
  },
  {
    label: '1x',
    value: 1,
  },
  {
    label: '2x',
    value: 2,
  },
];

export const SpeedController = ({
  speed,
  onSpeedChange,
}) => {
  return (
    <Segmented
      style={{
        backgroundColor: 'var(--color-btn-bg)',
        color: 'var(--color-btn-text)',
      }}
      options={options}
      value={speed}
      onChange={(value) => onSpeedChange(value)}
    />
  );
};
