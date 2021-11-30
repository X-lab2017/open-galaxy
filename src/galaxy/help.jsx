/**
 * This component shows basic navigation help. The idea is to show it only
 * first time when user opens. All subsequent page opening should not trigger
 * help screen.
 *
 * The only possible way to show help again is by triggerign "show help"
 * action, which is currently bound to mouse wheel event
 */
import React from 'react';
import appEvents from './service/appEvents.js';
import Key from './utils/key.js';

export default require('maco')(help, React);

var helpWasShown = false;

function help(x) {
  var graphDownloaded = false;

  x.render = function() {
    if (window.orientation !== undefined) {
      // no need to show help on orientation enabled devices
      return null;
    }

    if (helpWasShown) {
      // no need to annoy people
      return null;
    }

    if (!graphDownloaded) {
      // Show help only after all is downloaded
      return null;
    }

    return (
        <div className='navigation-help'>
          <h3>开源星系航行指南</h3>
            <table><tbody>
      <tr>
        <td colSpan="2"><code className='important-key'>鼠标滚轮</code></td>
        <td colSpan="2">显示该指南</td>
      </tr>
      <tr className='spacer-row'>
        <td colSpan='2'><code className='important-key' >任何键盘按键</code></td>
        <td colSpan='2'>隐藏该指南</td>
      </tr>
      <tr>
      <td><code>W</code></td>
      <td>前进</td>
      <td><code>Up</code></td>
      <td>向上旋转</td>
      </tr>
      <tr>
      <td><code>S</code></td>
      <td>后退</td>
      <td><code>Down</code></td>
      <td>向下旋转</td>
      </tr>
      <tr>
      <td><code>A</code></td>
      <td>左移</td>
      <td><code>Left</code></td>
      <td>向左旋转</td>
      </tr>
      <tr>
      <td><code>D</code></td>
      <td>右移</td>
      <td><code>Right</code></td>
      <td>向右旋转</td>
      </tr>
      <tr>
      <td><code>Q</code></td>
      <td>左翻</td>
      <td><code>R</code></td>
      <td>上移</td>
      </tr>
      <tr>
      <td><code>E</code></td>
      <td>右翻</td>
      <td><code>F</code></td>
      <td>下移</td>
      </tr>
      <tr>
      <td><code>shift</code></td>
      <td>加速</td>
      <td><code>Space</code></td>
      <td>开/关 领航模式</td>
      </tr>
      <tr>
      <td><code>L</code></td>
      <td>显/隐 边</td>
      <td><code>`(反引号)</code></td>
      <td>显/隐 数据大屏</td>
      </tr>
      </tbody></table>
        </div>
        );
    };

  x.componentDidMount = function () {
    if (window.orientation !== undefined) return;
    appEvents.graphDownloaded.on(showHelpIfNeeded);
    appEvents.downloadGraphRequested.on(resetHelp);
    appEvents.toggleHelp.on(toggleHelp);

    listenToKeys();
    listenToWheel();
  }

  x.componentWillUnmount = function () {
    if (window.orientation !== undefined) return;
    appEvents.graphDownloaded.off(showHelpIfNeeded);
    appEvents.downloadGraphRequested.off(resetHelp);
    appEvents.toggleHelp.off(toggleHelp);

    releaseKeyListener();
    releaseWheel();
  }

  function showHelpIfNeeded() {
    if (helpWasShown) return;
    graphDownloaded = true;

    x.forceUpdate();
  }

  function toggleHelp() {
    helpWasShown = !helpWasShown;
    x.forceUpdate();
  }

  function resetHelp() {
    graphDownloaded = false;
    x.forceUpdate();
  }

  function handlekey(e) {
    if (Key.isModifier(e)) {
      // ignore modifiers
      return;
    }
    var needsUpdate = !helpWasShown;
    helpWasShown = true;

    if (needsUpdate) {
      x.forceUpdate();
    }
  }

  function handlewheel(e) {
    // only show when used on scene
    if (e.target && e.target.nodeName === 'CANVAS') {
      helpWasShown = false;
      x.forceUpdate();
      appEvents.focusScene.fire();
    }
  }

  function listenToKeys() {
    document.body.addEventListener('keydown', handlekey);
  }

  function listenToWheel() {
    document.body.addEventListener('wheel', handlewheel, true);
  }

  function releaseKeyListener() {
    document.body.removeEventListener('keydown', handlekey, true);
  }

  function releaseWheel() {
    document.body.removeEventListener('wheel', handlewheel, true);
  }
}
