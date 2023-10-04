import scene from '../store/scene.js';
import { NodeList } from '../../components/NodeList/index.jsx';
import isRepoName from '../utils/isRepoName.js';

import React from 'react';
import intl from 'react-intl-universal';

export const ConnectedNodeList = ({ nodeId, nodeName }) => {
  if (!nodeId) {
    return null;
  }

  const connectionType = isRepoName(nodeName) ? 'in' : 'out';
  const conenctions = scene.getConnected(nodeId, connectionType);

  const Title = (
    <h4 className="window-title">
      <span className="node-name" id={nodeId}>
        {nodeName}
      </span>
      {isRepoName(nodeName)
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
      className="grid-row"
      title={Title}
      nodes={conenctions}
    />
  );
}