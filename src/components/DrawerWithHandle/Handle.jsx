import React from 'react';
import { MenuOutlined } from '@ant-design/icons';

export const Handle = ({ hidden, onClick, placement }) => {
  return (
    <div
      hidden={hidden}
      onClick={onClick}
      style={{
        position: 'absolute',
        width: '20px',
        height: '40px',
        top: '50%',
        right: placement === 'left' ? '0px' : 'unset',
        left: placement === 'left' ? 'unset' : '0px',
        transform: `translate(${placement === 'right' ? '-' : ''}100%, -50%)`,
        zIndex: 1000,
        backgroundColor: 'white',
      }}>
      <MenuOutlined />
    </div>
  )
}