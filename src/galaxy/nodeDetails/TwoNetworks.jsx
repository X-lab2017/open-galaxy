import Graph from "./Graph.jsx";
import request from "../service/request.js";
import { VerticalDivider } from "../../components/Divider/index.jsx";

import React, { useEffect, useState } from "react";
import intl from "react-intl-universal";
import regeneratorRuntime from "regenerator-runtime"; // see https://stackoverflow.com/a/70933339/10369621

const graphStyle = {
  width: "100%",
  height: "230px",
};

export const TwoNetworks = ({ nodeName }) => {
  const [projectNetworkData, setProjectNetworkData] = useState(null);
  const [contributorNetworkData, setContributorNetworkData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url1 = `https://oss.x-lab.info/open_digger/github/${nodeName}/repo_network.json`;
      const data1 = await request(url1, {
        responseType: "json",
      });
      if (data1.hasOwnProperty("error")) {
        throw `"${nodeName}": ${data1.error}`;
      }
      setProjectNetworkData(data1);

      const url2 = `https://oss.x-lab.info/open_digger/github/${nodeName}/developer_network.json`;
      const data2 = await request(url2, {
        responseType: "json",
      });
      if (data2.hasOwnProperty("error")) {
        throw `"${nodeName}": ${data2.error}`;
      }
      setContributorNetworkData(data2);
    }
    fetchData();
  }, [nodeName]);

  if (!projectNetworkData || !contributorNetworkData) return null;

  return (
    <div className="grid-row two-networks">
      {/* project network */}
      <div className="project-network">
        <h4 className="text-center">{intl.get("PROJECT_CORRELATION_NETWORK")}</h4>
        <Graph
          data={projectNetworkData}
          style={graphStyle}
          focusedNodeID={nodeName}
        />
      </div>
      {/* divider */}
      <div className="vertical-divider" />
      {/* contributor network */}
      <div className="contributor-network">
        <h4 className="text-center">{intl.get("CONTRIBUTOR_CORRELATION_NETWORK")}</h4>
        <Graph
          data={contributorNetworkData}
          style={graphStyle}
        />
      </div>
    </div>
  );
}