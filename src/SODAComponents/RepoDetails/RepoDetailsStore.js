import eventify from "ngraph.events";
import regeneratorRuntime from "regenerator-runtime"; // see https://stackoverflow.com/a/70933339/10369621

import appEvents from "../../galaxy/service/appEvents.js";
import scene from "../../galaxy/store/scene.js";
import request from "../../galaxy/service/request.js";

function RepoDetailsStore() {
  var api = {
    loadRepodetails,
  };

  var currentNodeId;
  appEvents.selectNode.on(updateDetails);

  eventify(api);

  return api;

  function updateDetails(nodeId) {
    currentNodeId = nodeId;
    api.fire("changed");
  }

  async function loadRepodetails() {
    if (currentNodeId === undefined) return;

    let currentRepoFullname = scene.getNodeInfo(currentNodeId).name;

    let projectNetworkDataUrl = `https://oss.x-lab.info/open_digger/github/${currentRepoFullname}/repo_network.json`;
    let projectNetworkData = await request(projectNetworkDataUrl, {
      responseType: "json",
    });
    if (projectNetworkData.hasOwnProperty("error")) {
      throw `"${currentRepoFullname}": ${projectNetworkData.error}`;
    }

    let contributorNetworkDataUrl = `https://oss.x-lab.info/open_digger/github/${currentRepoFullname}/developer_network.json`;
    let contributorNetworkData = await request(contributorNetworkDataUrl, {
      responseType: "json",
    });
    if (contributorNetworkData.hasOwnProperty("error")) {
      throw `"${currentRepoFullname}": ${contributorNetworkData.error}`;
    }

    return {
      currentRepoFullname,
      // contributorsActivityEvolutionDataUrl,
      projectNetworkData,
      contributorNetworkData,
    };
  }
}

export default RepoDetailsStore();
