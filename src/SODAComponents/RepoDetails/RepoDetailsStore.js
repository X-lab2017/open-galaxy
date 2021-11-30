import appEvents from "../../galaxy/service/appEvents.js";
import eventify from "ngraph.events";
import scene from "../../galaxy/store/scene.js";
import request from "../../galaxy/service/request.js";

export default RepoDetailsStore();

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

    let contributorsActivityEvolutionDataUrl = `https://hypertrons-oss.x-lab.info/opengalaxy-mock-data/contributors-activity-evolution/data_${
      currentNodeId % 8
    }.csv`;
    let projectNetworkDataUrl = `https://hypertrons-oss.x-lab.info/repo/${currentRepoFullname}.json`;
    let projectNetworkData = await request(projectNetworkDataUrl, {
      responseType: "json",
    });
    let contributorNetworkDataUrl = `https://hypertrons-oss.x-lab.info/repo/${currentRepoFullname}_top.json`;
    let contributorNetworkData = await request(contributorNetworkDataUrl, {
      responseType: "json",
    });

    return {
      currentRepoFullname,
      contributorsActivityEvolutionDataUrl,
      projectNetworkData,
      contributorNetworkData,
    };
  }
}
