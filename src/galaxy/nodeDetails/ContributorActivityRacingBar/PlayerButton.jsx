import React, { useRef } from 'react';
import { Button, Tooltip } from 'antd';

export const PlayerButton = ({ tooltip, icon, onClick, onLongPress, }) => {
  const pressingRef = useRef(false);
  const longPressDetectedRef = useRef(false);
  const timerRef = useRef();

  const handleMouseDown = () => {
    pressingRef.current = true;
    timerRef.current = setTimeout(() => {
      if (pressingRef.current) {
        longPressDetectedRef.current = true;
        onLongPress?.();
      }
    }, 1000);
  };

  const handleMouseUp = () => {
    clearTimeout(timerRef.current);
    pressingRef.current = false;

    if (longPressDetectedRef.current) {
      longPressDetectedRef.current = false;
      return;
    }

    onClick?.();
  };

  return (
    <Tooltip
      style={{ visibility: tooltip ? 'visible' : 'hidden' }}
      title={tooltip}
      mouseEnterDelay={1}
    >
      <Button
        style={{ backgroundColor: 'transparent' }}
        styles={{ icon: { color: 'white' } }}
        size='small'
        icon={icon}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
    </Tooltip>
  );
};
