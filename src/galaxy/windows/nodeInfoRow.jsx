import React from 'react';
import formatNumber from '../utils/formatNumber.js';

import isRepoName from '../utils/isRepoName.js';

export default function windowTitle(props) {
  var item = props.viewModel;
  var image = '';
  if (item.icon) {
    image = <img src={item.icon} width='15px' />;
  }

  return (
    <div className="row">
      <div className="no-oveflow col-md-9 col-xs-9">
        {image}
        <span id={item.id} className="node-focus">
          {item.name}
        </span>
      </div>
      {isRepoName(item.name) ? (
        <div id={item.id} className="in-degree col-md-3 col-xs-3 text-center">
          {formatNumber(item.in)}
        </div>
      ) : (
        <div id={item.id} className="out-degree col-md-3 col-xs-3 text-center">
          {formatNumber(item.out)}
        </div>
      )}
    </div>
  );
}
