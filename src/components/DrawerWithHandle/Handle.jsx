import React from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const iconStyle = {
  color: '#FFFFFF',
}

export const Handle = ({ hidden, onClick, drawerPlacement, drawerOpen }) => {
  const isLeft = drawerPlacement === 'left';

  let icon;
  if (isLeft) {
    if (drawerOpen) {
      icon = <LeftOutlined style={iconStyle} />
    } else {
      icon = <RightOutlined style={iconStyle} />
    }
  } else {
    if (drawerOpen) {
      icon = <RightOutlined style={iconStyle} />
    } else {
      icon = <LeftOutlined style={iconStyle} />
    }
  }

  if (hidden) return null;

  return (
    <div
      onClick={onClick}
      style={{
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '20px',
        height: '50px',
        top: '50%',
        right: isLeft ? '0px' : 'unset',
        left: isLeft ? 'unset' : '0px',
        transform: `translate(${drawerPlacement === 'right' ? '-' : ''}100%, -50%)`,
        zIndex: 1000,
        backgroundColor: 'rgb(77, 77, 77)',
        cursor: 'pointer',
        borderRadius: isLeft ? '0px 3px 3px 0px' : '3px 0px 0px 3px',
      }}>
      {icon}
    </div>
  )
}