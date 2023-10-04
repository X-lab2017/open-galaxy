import formatNumber from '../../galaxy/utils/formatNumber.js';
import isRepoName from '../../galaxy/utils/isRepoName.js';
import appEvents from '../../galaxy/service/appEvents.js';

import React from 'react';

export const NodeListItem = ({ item }) => {
  const handleClick = () => {
    appEvents.focusOnNode.fire(item.id);
  };

  return (
    <div className="row">
      <div className="no-oveflow col-md-9 col-xs-9 node-focus" onClick={handleClick}>
        <span id={item.id}>
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
