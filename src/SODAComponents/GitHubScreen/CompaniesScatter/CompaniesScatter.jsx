import React from "react";
import ReactEchartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts";

import banner from "./banner.png";

class CompaniesScatter extends React.Component {
  render() {
    if (!this.props.data) return null;

    let width = this.props.width;
    let height = this.props.height;

    let scatters = this.props.data;
    let logoBaseUrl = this.props.logoBaseUrl;

    const option = {
      title: {
        show: true,
        text: "{imgBg|知名公司GitHub仓库数及总活跃度}",
        left: "center",
        top: 0,
        textStyle: {
          rich: {
            imgBg: {
              fontSize: 16,
              fontWeight: "bold",
              color: "white",
              // fontFamily: "Microsoft YaHei",
              backgroundColor: {
                image: banner,
              },
              width: 330,
              height: 50,
            },
          },
        },
      },
      tooltip: {
        formatter: function (params) {
          let d = params.data;
          return `${d[2]}<br />总仓库数: ${d[0]}<br />总活跃度: ${d[1].toFixed(1)}`
        },
      },
      grid: {
        top: "15%",
        left: "10%",
        right: "5%",
        bottom: "10%",
        containLabel: true,
      },
      xAxis: {
        type: "log",
        logBase: 10,
        name: "项目数",
        nameGap: 25,
        nameLocation: "middle",
        nameTextStyle: {
          fontSize: 18,
        },
        axisLine: {
          symbol: ['none', 'arrow']
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter: "{value}",
        },
      },
      yAxis: {
        type: "log",
        logBase: 10,
        name: "总活跃度",
        nameGap: 40,
        nameLocation: 'middle',
        nameTextStyle: {
          fontSize: 18,
        },
        axisLine: {
          symbol: ['none', 'arrow']
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter: "{value}",
        },
      },
      series: [
        {
          type: "scatter",
          label: {
            show: false,
            position: "top",
            fontSize: 14,
            color: 'white',
            formatter: (params) => {
              return params.value[2]; 
            },
          },
          data: scatters,
          symbol: (params) => {
            return `image://${logoBaseUrl}/${params[2]}.png`;
          },
          symbolSize: function (val) {
            // return sizeFunction(val[2]);
            return 60;
          },
        },
      ],
    };

    return (
      <ReactEchartsCore
        echarts={echarts}
        option={option}
        style={{ width, height }}
      />
    );
  }
}

export default CompaniesScatter;
