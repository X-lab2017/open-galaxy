/**
 * Prepares data for selected node details
 */
import appEvents from '../service/appEvents.js';
import scene from '../store/scene.js';
import DegreeWindowViewModel from './degreeWindowViewModel.js';

import getBaseNodeViewModel from '../store/baseNodeViewModel.js';

import eventify from 'ngraph.events';

import isRepoName from '../utils/isRepoName.js';

export default nodeDetailsStore();

function nodeDetailsStore() {
  var api = {
    getSelectedNode: getSelectedNode
  };

  var currentNodeId, degreeVisible = false,
      currentConnectionType;

  appEvents.selectNode.on(updateDetails);
  appEvents.showDegree.on(updateDegreeDetails);

  eventify(api);

  return api;

  function updateDetails(nodeId) {
    currentNodeId = nodeId;
    updateDegreeDetails(currentNodeId, currentConnectionType);
  }

  function updateDegreeDetails(id, connectionType) {
    currentNodeId = id;

    degreeVisible = currentNodeId !== undefined;
    if (degreeVisible) {
      currentConnectionType = connectionType;
      var rootInfo = scene.getNodeInfo(id);
      // ignore existing code to change `currentConnectType` or `connectionType`,
      // however to use node name to decide whether it is 'in' or 'out'.
      if (isRepoName(rootInfo.name)) {
        currentConnectionType = connectionType = 'in';
      } else {
        currentConnectionType = connectionType = 'out';
      }
      var conenctions = scene.getConnected(id, connectionType);

      var viewModel = new DegreeWindowViewModel(rootInfo.name, conenctions, connectionType, id);

      appEvents.showNodeListWindow.fire(viewModel, 'degree');
    } else {
      appEvents.hideNodeListWindow.fire('degree');
    }
    api.fire('changed');
  }

  function getSelectedNode() {
    if (currentNodeId === undefined) return;

    return getBaseNodeViewModel(currentNodeId);
  }
}
