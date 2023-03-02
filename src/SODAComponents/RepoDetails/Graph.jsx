import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

import { linearMap, debounce } from "./helpers";

const NODE_SIZE = [10, 25];

const generateEchartsData = (data, focusedNodeID) => {
  const generateNodes = (nodes) => {
    const values = nodes.map((item) => item[1]);
    const minMax = [Math.min(...values), Math.max(...values)];
    return nodes.map((n) => {
      const avatarId = n[0].split("/")[0];
      return {
        id: n[0],
        name: n[0],
        value: n[1],
        symbolSize: linearMap(n[1], minMax, NODE_SIZE),
        symbol: `image://https://avatars.githubusercontent.com/${avatarId}`,
        label: {
          show: n[0] === focusedNodeID ? true : false,
        },
      };
    });
  };
  const generateEdges = (edges) => {
    if (edges.length === 0) {
      return [];
    }
    const threshold = edges[0][0].split("/").length === 2 ? 5 : 2.5;
    return edges
      .map((e) => {
        return {
          source: e[0],
          target: e[1],
          value: e[2],
        };
      })
      .filter((edge) => edge.value > threshold); // trim edges with small value to avoid a dense but useless graph
  };
  return {
    nodes: generateNodes(data.nodes),
    edges: generateEdges(data.edges),
  };
};

const Graph = ({ data, style = {}, focusedNodeID }) => {
  const divEL = useRef(null);
  const graphData = generateEchartsData(data, focusedNodeID);
  const option = {
    tooltip: {},
    animation: true,
    animationDuration: 2000,
    series: [
      {
        type: "graph",
        layout: "force",
        nodes: graphData.nodes,
        edges: graphData.edges,
        // Enable mouse zooming and translating
        roam: true,
        label: {
          position: "right",
        },
        force: {
          initLayout: "circular",
          gravity: 0.1,
          repulsion: 80,
          edgeLength: [50, 100],
          // Disable the iteration animation of layout
          layoutAnimation: false,
        },
        lineStyle: {
          curveness: 0.3,
          opacity: 0.2,
        },
        emphasis: {
          focus: "adjacency",
          label: {
            position: "right",
            show: true,
          },
        },
      },
    ],
  };

  useEffect(() => {
    let chartDOM = divEL.current;
    const instance = echarts.init(chartDOM);

    return () => {
      instance.dispose();
    };
  }, []);

  useEffect(() => {
    let chartDOM = divEL.current;
    const instance = echarts.getInstanceByDom(chartDOM);
    if (instance) {
      instance.setOption(option);
      instance.on("click", (params) => {
        const url = "https://github.com/" + params.data.id;
        window.open(url, "_blank");
      });

      const [debouncedResize, teardown] = debounce(() => {
        instance.resize();
      }, 500);
      window.addEventListener("resize", debouncedResize);
    }
  }, [data]);

  return (
    <div className="hypertrons-crx-border">
      <div ref={divEL} style={style}></div>
    </div>
  );
};

export default Graph;
