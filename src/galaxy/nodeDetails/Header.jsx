import React from "react";
import intl from "react-intl-universal";

import isRepoName from "../utils/isRepoName";

export const Header = ({ model }) => {
  return (
    <div className="container-fluid row">
      <div className="hidden-xs no-pads">
        <div className="col-xs-2">
          <a href={`https://github.com/${model.name}`} target="_blank">
            <img
              width="50px"
              height="50px"
              src={`https://avatars.githubusercontent.com/${
                model.name.split("/")[0]
              }`}
              alt="logo"
            ></img>
          </a>
        </div>
        <div className="col-xs-7 text-center">
          <a
            href={`https://github.com/${model.name}`}
            target="_blank"
            className="deco-none"
          >
            <h4 title={model.name}>{model.name}</h4>
          </a>
        </div>
        {isRepoName(model.name) ? (
          <div className="col-xs-3">
            <h2 id={model.id} className="in-degree">
              {model.inDegree}
            </h2>
            <div className="small">{intl.get("RELATED_DEVELOPER")}</div>
          </div>
        ) : (
          <div className="col-xs-3">
            <h2 id={model.id} className="out-degree">
              {model.outDegree}
            </h2>
            <div className="small">{intl.get("RELATED_PROJECT")}</div>
          </div>
        )}
      </div>

      {/* when window size is too small */}
      <div className="visible-xs-block">
        <div className="row info-block">
          <div className="col-xs-6 no-overflow">
            <h5>{model.name}</h5>
          </div>
          {isRepoName(model.name) ? (
            <div id={model.id} className="in-degree col-xs-3">
              {model.inDegree}
            </div>
          ) : (
            <div id={model.id} className="out-degree col-xs-3">
              {model.outDegree}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}