import React from "react";
import { Space } from "antd";

export const Header = ({ model }) => {
  return (
    <div className="grid-row">
      <Space size="middle">
        {/* avatar */}
        <a href={`https://github.com/${model.name}`} target="_blank">
          <img
            width="30px"
            height="30px"
            src={`https://avatars.githubusercontent.com/${model.name.split("/")[0]
              }`}
            alt="logo"
          ></img>
        </a>
        {/* repo name or developer name */}
        <a
          href={`https://github.com/${model.name}`}
          target="_blank"
          className="deco-none"
        >
          <h4 title={model.name}>{model.name}</h4>
        </a>
      </Space>
    </div>
  )
}