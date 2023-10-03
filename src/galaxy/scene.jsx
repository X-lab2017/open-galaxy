import React from "react";
import { findDOMNode } from "react-dom";
import HoverInfo from "./hoverInfo.jsx";
import { NodeDetails } from "./NodeDetails/index.jsx";

import SteeringIndicator from "./steeringIndicator.jsx";
import { Search } from "./Search/index.jsx";
import NoWebGL from "./noWebgl.jsx";
import Help from "./help.jsx";

import createNativeRenderer from "./native/renderer.js";
import createKeyboardBindings from "./native/sceneKeyboardBinding.js";

import RepoDetails from '../SODAComponents/RepoDetails/RepoDetails.jsx';

import LocaleSelector from './locale/LocaleSelector.jsx';

import appEvents from "./service/appEvents.js";
var webglEnabled = require("webgl-enabled")();

class scene extends React.Component {
  constructor() {
    super();
    this.handleDelegateClick = this.handleDelegateClick.bind(this);
  }

  nativeRenderer;
  keyboard;
  hoverModel;
  delegateClickHandler;

  render() {
    if (!webglEnabled) {
      return <NoWebGL />;
    }

    return (
      <div>
        <div ref="graphContainer" className="graph-full-size">
        </div>
        <RepoDetails />
        <HoverInfo />
        <NodeDetails />
        <SteeringIndicator />
        <Search />
        <LocaleSelector />
        <Help />
      </div>
    );
  };

  componentDidMount() {
    if (!webglEnabled) return;
    var container = findDOMNode(this.refs.graphContainer);
    this.nativeRenderer = createNativeRenderer(container);
    this.keyboard = createKeyboardBindings(container);
    this.delegateClickHandler = container.parentNode;
    this.delegateClickHandler.addEventListener("click", this.handleDelegateClick);
  };

  componentWillUnmount() {
    if (this.nativeRenderer) this.nativeRenderer.destroy();
    if (this.keyboard) this.keyboard.destroy();
    if (this.delegateClickHandler)
      this.delegateClickHandler.removeEventListener("click", this.handleDelegateClick);
  };

  handleDelegateClick(e) {
    var clickedEl = e.target;

    // since we are handling all clicks, we should avoid excessive work and
    // talk with DOM only when absolutely necessary:
    var classList = clickedEl.classList;
    var nodeId;
    if (classList.contains("node-focus")) {
      nodeId = parseInt(clickedEl.id, 10);
      appEvents.focusOnNode.fire(nodeId);
    }
  }
}

export default scene;
