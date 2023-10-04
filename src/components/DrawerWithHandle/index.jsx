import { Handle } from './Handle';

import './index.less';

import React, { useState } from 'react';
import { Drawer } from 'antd';

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
    <div style={{
      position: 'fixed',
      right: placement === 'left' ? 'unset' : '0px',
      left: placement === 'left' ? '0px' : 'unset',
      width: open ? width : '0px',
      height,
      top: '50%',
      transform: 'translateY(-50%)',
    }}>
      <Handle
        hidden={openChanging}
        onClick={toggle}
        placement={placement}
      />
      <Drawer
        style={{
          position: 'absolute',
          height,
          top: '50%',
          transform: 'translateY(-50%)',
          boxShadow: 'none',
        }}
        afterOpenChange={handleAfterOpenChange}
        open={open}
        closeIcon={null}
        placement={placement}
        onClose={hide}
        keyboard={true}
        maskClosable={false}
        mask={false}
        width={width}
        bodyStyle={{ padding: '20px' }}
      >
        {children}
      </Drawer>
    </div>
  );
};