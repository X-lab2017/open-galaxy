import appEvents from '../service/appEvents.js';
import { Header } from './Header.jsx';
import { ConnectedNodeList } from './ConnectedNodeList.jsx';
import getBaseNodeViewModel from '../store/baseNodeViewModel.js';

import React, { useEffect, useState } from 'react';

export const NodeDetails = () => {
  const [currentNodeId, setCurrentNodeId] = useState(null);

  const update = (nodeId) => {
    setCurrentNodeId(nodeId);
  }

  useEffect(() => {
    appEvents.selectNode.on(update);
    return (() => {
      appEvents.selectNode.off(update);
    });
  }, []);

  if (!currentNodeId) return null;

  const nodeModel = getBaseNodeViewModel(currentNodeId);

  return (
    <>
      <div className='basic-node-info'>
        <Header model={nodeModel} />
      </div>
      <ConnectedNodeList currentNodeId={currentNodeId} />
    </>
  );
}