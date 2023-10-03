import React, { useEffect, useState } from 'react';
import detailModel from './nodeDetailsStore.js';
import { BasicNodeInfo } from './BasicNodeInfo.jsx';

export const NodeDetails = () => {
  const selectedNode = detailModel.getSelectedNode();
  // a hack to force update the view
  const [,setVersion] = useState(0);
  const updateView = () => {
    setVersion(version => version + 1);
  };

  useEffect(() => {
    detailModel.on('changed', updateView);
    return (() => {
      detailModel.off('changed', updateView);
    });
  }, []);

  if (!selectedNode) return null;

  return (
    <div className='basic-node-info'>
      <BasicNodeInfo model={selectedNode} />
    </div>
  );
}