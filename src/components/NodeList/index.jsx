import { NodeListItem } from "./NodeListItem.jsx";

import React from "react";
import ReactList from "react-list";

export const NodeList = ({ className, title, nodes }) => {
  function renderItem(idx, key) {
    return <NodeListItem key={key} item={nodes[idx]} />;
  }

  function getHeight() {
    // FIXME: Hardcoding is not good.
    return 20;
  }

  function content(items) {
    if (items.length > 0) {
      return (
        <>
          {title}
          <ReactList
            itemRenderer={renderItem}
            length={nodes.length}
            itemSizeGetter={getHeight}
            type="variable"
          />
        </>
      );
    } else {
      return null;
    }
  }

  return (
    <div className={`window-list-content ${className}`}>{content(nodes)}</div>
  );
};