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
import intl from 'react-intl-universal';

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
          <h3>{intl.get('HELP_TITLE')}</h3>
            <table><tbody>
      <tr>
        <td colSpan="2"><code className='important-key'>{intl.get('HELP_MOUSE_WHEEL')}</code></td>
        <td colSpan="2">{intl.get('HELP_SHOW_GUIDE')}</td>
      </tr>
      <tr className='spacer-row'>
        <td colSpan='2'><code className='important-key' >{intl.get('HELP_ANY_KEY')}</code></td>
        <td colSpan='2'>{intl.get('HELP_HIDE_GUIDE')}</td>
      </tr>
      <tr>
      <td><code>W</code></td>
      <td>{intl.get('HELP_MOVE_FORWARD')}</td>
      <td><code>Up</code></td>
      <td>{intl.get('HELP_ROTATE_UP')}</td>
      </tr>
      <tr>
      <td><code>S</code></td>
      <td>{intl.get('HELP_MOVE_BACKWARD')}</td>
      <td><code>Down</code></td>
      <td>{intl.get('HELP_ROTATE_DOWN')}</td>
      </tr>
      <tr>
      <td><code>A</code></td>
      <td>{intl.get('HELP_MOVE_LEFT')}</td>
      <td><code>Left</code></td>
      <td>{intl.get('HELP_ROTATE_LEFT')}</td>
      </tr>
      <tr>
      <td><code>D</code></td>
      <td>{intl.get('HELP_MOVE_RIGHT')}</td>
      <td><code>Right</code></td>
      <td>{intl.get('HELP_ROTATE_RIGHT')}</td>
      </tr>
      <tr>
      <td><code>Q</code></td>
      <td>{intl.get('HELP_ROLL_RIGHT')}</td>
      <td><code>R</code></td>
      <td>{intl.get('HELP_FLY_UP')}</td>
      </tr>
      <tr>
      <td><code>E</code></td>
      <td>{intl.get('HELP_ROLL_LEFT')}</td>
      <td><code>F</code></td>
      <td>{intl.get('HELP_FLY_DOWN')}</td>
      </tr>
      <tr>
      <td><code>shift</code></td>
      <td>{intl.get('HELP_MOVE_FASTER')}</td>
      <td><code>Space</code></td>
      <td>{intl.get('HELP_TOGGLE_STEERING')}</td>
      </tr>
      <tr>
      <td><code>L</code></td>
      <td>{intl.get('HELP_TOGGLE_LINK')}</td>
      <td><code>`({intl.get('HELP_BACKQUOTE')})</code></td>
      <td>{intl.get('HELP_TOGGLE_DATA_SCREEN')}</td>
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
