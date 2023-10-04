import { Handle } from './Handle';

import './index.less';

import React, { useState } from 'react';
import { Drawer } from 'antd';

/**
 * A drawer component with a handle to show and hide it. 
 * Currently only supports placement on the left or right side of the screen.
 */
export const DrawerWithHandle = ({ children, width, height, placement }) => {
  const [open, setOpen] = useState(true);
  const [openChanging, setOpenChanging] = useState(true);

  const show = () => {
    setOpen(true);
    setOpenChanging(true);
  };

  const hide = () => {
    setOpenChanging(true);
    setOpen(false);
  };

  const toggle = () => {
    if (open) {
      hide();
    } else {
      show();
    }
  }

  const handleAfterOpenChange = () => {
    setOpenChanging(false);
  }

  return (
    <div
      style={{
        position: 'fixed',
        // vertical centering
        top: '50%',
        transform: 'translateY(-50%)',
        right: placement === 'left' ? 'unset' : '0px',
        left: placement === 'left' ? '0px' : 'unset',
        width: open ? width : '0px',
        height,
      }}>
      <Handle
        hidden={openChanging}
        onClick={toggle}
        placement={placement}
      />
      <Drawer
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          height,
          // no edge border when in full height
          boxSizing: 'content-box',
          border: '0.5px solid #7F7F7F',
          boxShadow: 'none',
          backgroundColor: 'transparent',
        }}
        bodyStyle={{
          padding: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
        }}
        placement={placement}
        width={width}
        open={open}
        afterOpenChange={handleAfterOpenChange}
        closeIcon={null}
        onClose={hide}
        keyboard={true}
        maskClosable={false}
        mask={false}
      >
        {children}
      </Drawer>
    </div>
  );
};