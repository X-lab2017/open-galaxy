import scene from '../store/scene.js';
import isRepoName from '../utils/isRepoName.js';
import formatNumber from '../utils/formatNumber.js';
import { NodeList } from './NodeList.jsx';

import React from 'react';

function ConnectedNodeListModel(name, list, connectionType, id) {
  this.id = id;
  this.className = 'degree-results-window';
  this.list = list;
  this.nodeName = name;
  this.degreeNumber = formatNumber(list.length);
  this.connectionType = connectionType;
  this.degreeKindName = 'None';
}
ConnectedNodeListModel.prototype.__name = 'DegreeWindowViewModel';

function getViewModel(nodeId) {
  if (nodeId) {
    const rootInfo = scene.getNodeInfo(nodeId);
    const connectionType = isRepoName(rootInfo.name) ? 'in' : 'out';
    const conenctions = scene.getConnected(nodeId, connectionType);
    const viewModel = new ConnectedNodeListModel(rootInfo.name, conenctions, connectionType, nodeId);
    return viewModel;
  }
  return null;
}

export const ConnectedNodeList = ({ currentNodeId }) => {
  const viewModel = getViewModel(currentNodeId);

  if (!viewModel) {
    return null;
  }

  return (
    <NodeList windowViewModel={viewModel} />
  );
}