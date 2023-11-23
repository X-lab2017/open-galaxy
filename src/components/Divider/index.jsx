import React from 'react';

export const HorizontalDivider = ({ color }) => {
  return (
    <div style={{ height: '0.5px', backgroundColor: color }} />
  );
}

export const VerticalDivider = ({ color }) => {
  return (
    <div style={{ width: '0.5px', backgroundColor: color }} />
  );
} 