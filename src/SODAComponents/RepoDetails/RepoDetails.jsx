import React from "react";
import intl from "react-intl-universal";

import detailModel from "./RepoDetailsStore.js";
import "./RepoDetails.less";
import Graph from "./Graph.jsx";

const graphStyle = {
  width: "320px",
  height: "360px",
};

class RepoDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      currentRepoFullname: null,
      projectNetworkData: null,
      contributorNetworkData: null,
    };
    this.updateView = this.updateView.bind(this);
  }

  render() {
    if (
      !this.state.currentRepoFullname ||
      !this.state.projectNetworkData ||
      !this.state.contributorNetworkData
    )
      return null;

    return (
      <div>
        <div className="cool-box two-networks-box">
          <div className="project-network-box">
            <h3>{intl.get("PROJECT_CORRELATION_NETWORK")}</h3>
            <Graph
              data={this.state.projectNetworkData}
              style={graphStyle}
              focusedNodeID={this.state.currentRepoFullname}
            />
          </div>
          <div className="contributor-network-box">
            <h3>{intl.get("CONTRIBUTOR_CORRELATION_NETWORK")}</h3>
            <Graph
              data={this.state.contributorNetworkData}
              style={graphStyle}
            />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    detailModel.on("changed", this.updateView);
  }

  componentWillUnmount() {
    detailModel.off("changed", this.updateView);
  }

  updateView() {
    detailModel
      .loadRepodetails()
      .then((data) => {
        this.setState({
          currentRepoFullname: data.currentRepoFullname,
          projectNetworkData: data.projectNetworkData,
          contributorNetworkData: data.contributorNetworkData,
        });
      })
      .catch((message) => {
        // window.alert('未选中结点或该结点的详细数据不存在。')
        console.log(message);
        this.setState({
          currentRepoFullname: null,
          projectNetworkData: null,
          contributorNetworkData: null,
        });
      });
  }
}

export default RepoDetails;
