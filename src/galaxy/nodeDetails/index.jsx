import appEvents from '../service/appEvents.js';
import scene from '../store/scene.js';
import { Header } from './Header.jsx';
import { ConnectedNodeList } from './ConnectedNodeList.jsx';
import getBaseNodeViewModel from '../store/baseNodeViewModel.js';
import { DrawerWithHandle } from '../../components/DrawerWithHandle';
import { HorizontalDivider } from '../../components/Divider';
import { TwoNetworks } from './TwoNetworks';
import { ContributorActivityRacingBar } from './ContributorActivityRacingBar';
import isRepoName from '../utils/isRepoName.js';

import './index.less';

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

  const rootInfo = scene.getNodeInfo(currentNodeId);
  const nodeName = rootInfo.name;
  const isRepo = isRepoName(nodeName);
  const nodeModel = getBaseNodeViewModel(currentNodeId);

  return (
    <DrawerWithHandle
      width="500px"
      height="100vh"
      placement="right"
    >
      <div className="grid-container">
        {/* header */}
        <Header model={nodeModel} />

        <HorizontalDivider color="rgb(77, 77, 77)" />

        {/* two networks */}
        <TwoNetworks nodeName={nodeName} />

        <HorizontalDivider color="rgb(77, 77, 77)" />

        {/* contributor activity racing bar (repo only) */}
        {isRepo && <ContributorActivityRacingBar key={nodeName} repoName={nodeName} />}

        <HorizontalDivider color="rgb(77, 77, 77)" />

        {/* connected node list */}
        <ConnectedNodeList nodeId={currentNodeId} nodeName={nodeName} />
      </div>
    </DrawerWithHandle>
  );
}