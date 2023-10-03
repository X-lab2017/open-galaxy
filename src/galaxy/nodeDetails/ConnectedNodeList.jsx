import scene from '../store/scene.js';
import { NodeList } from '../../components/NodeList/index.jsx';
import isRepoName from '../utils/isRepoName.js';

import React from 'react';
import intl from 'react-intl-universal';

export const ConnectedNodeList = ({ currentNodeId }) => {
  if (!currentNodeId) {
    return null;
  }

  const rootInfo = scene.getNodeInfo(currentNodeId);
  const connectionType = isRepoName(rootInfo.name) ? 'in' : 'out';
  const conenctions = scene.getConnected(currentNodeId, connectionType);

  const Title = (
    <h4 className="window-title">
      <span className="node-name node-focus" id={currentNodeId}>
        {rootInfo.name}
      </span>
      {isRepoName(rootInfo.name)
        ? intl.getHTML("COUNT_FOR_RELATED_DEVELOPORS", {
          count: conenctions.length,
        })
        : intl.getHTML("COUNT_FOR_RELATED_PROJECTS", {
          count: conenctions.length,
        })}
    </h4>
  );

  return (
    <NodeList
      className="degree-results-window"
      title={Title}
      nodes={conenctions}
    />
  );
}