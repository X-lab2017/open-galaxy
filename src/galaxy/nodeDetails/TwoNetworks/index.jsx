import Graph from "./Graph.jsx";
import request from "../../service/request.js";

import React, { useEffect, useState } from "react";
import intl from "react-intl-universal";

const graphStyle = {
  height: "230px",
};

export const TwoNetworks = ({ nodeName }) => {
  const [projectNetworkData, setProjectNetworkData] = useState(null);
  const [contributorNetworkData, setContributorNetworkData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url1 = `https://oss.x-lab.info/open_digger/github/${nodeName}/repo_network.json`;
      try {
        const data1 = await request(url1, {
          responseType: "json",
        });
        setProjectNetworkData(data1);

      } catch (error) {
        setProjectNetworkData(null);
      }

      const url2 = `https://oss.x-lab.info/open_digger/github/${nodeName}/developer_network.json`;
      try {
        const data2 = await request(url2, {
          responseType: "json",
        });
        setContributorNetworkData(data2);

      } catch (error) {
        setContributorNetworkData(null);
      }
    }
    fetchData();
  }, [nodeName]);

  return (
    <div className="grid-row two-networks">
      {/* project network */}
      <div className="project-network">
        <h4 className="text-center">{intl.get("PROJECT_CORRELATION_NETWORK")}</h4>
        {
          projectNetworkData &&
          <Graph
            data={projectNetworkData}
            style={graphStyle}
            focusedNodeID={nodeName}
          />
        }
      </div>
      {/* divider */}
      <div className="vertical-divider" />
      {/* contributor network */}
      <div className="contributor-network">
        <h4 className="text-center">{intl.get("CONTRIBUTOR_CORRELATION_NETWORK")}</h4>
        {
          contributorNetworkData &&
          <Graph
            data={contributorNetworkData}
            style={graphStyle}
          />
        }
      </div>
    </div>
  );
}