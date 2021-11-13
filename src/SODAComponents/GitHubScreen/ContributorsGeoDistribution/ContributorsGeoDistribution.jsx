import React from "react";

import banner from "./banner.png";
import world2020 from "./world-2020.svg";

class ContributorsGeoDistribution extends React.Component {
  render() {
    // if (!this.props.data) return null;

    let width = this.props.width;
    let height = this.props.height;

    return (
      <div
        style={{
          width: width,
          height: height,
        }}
      >
        <div
          style={{
            marginTop: 5,
            marginLeft: (width-300)/2,
            marginBottom: 5,
            width: 300,
            height: 50,
            backgroundImage: `url(${banner})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            // 水平、垂直居中文字 ---- 外层设置即可
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "white",
            }}
          >
            2020年开源贡献者地理分布
          </div>
        </div>
        <img src={world2020} width={width} height={height-50-5-5} />
      </div>
    );
  }
}

export default ContributorsGeoDistribution;
