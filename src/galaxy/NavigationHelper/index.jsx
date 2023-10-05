import appEvents from '../service/appEvents.js';
import { DrawerWithHandle } from '../../components/DrawerWithHandle/index.jsx';

import './index.less';

import React, { useState, useEffect } from 'react';
import intl from 'react-intl-universal';

export const NavigationHelper = () => {
  const [graphDownloaded, setGraphDownloaded] = useState(false);

  const locale = intl.determineLocale({
    localStorageLocaleKey: "lang"
  });
  const isEnglish = locale === "en-US";

  const handleGraphDownloaded = () => {
    setGraphDownloaded(true);
  }

  useEffect(() => {
    appEvents.graphDownloaded.on(handleGraphDownloaded);

    return () => {
      appEvents.graphDownloaded.off(handleGraphDownloaded);
    }
  }, []);

  if (!graphDownloaded) {
    // Show help only after all is downloaded
    return null;
  }

  return (
    <DrawerWithHandle
      width="200px"
      height={isEnglish ? "420px" : "350px"}
      placement="left"
    >
      <div className="navigation-helper">
        <h4 className="text-center">{intl.get("HELP_TITLE")}</h4>
        {/* W S A D R F Q E */}
        {isEnglish ?
          <table>
            <tbody>
              <tr>
                <td> <code>W</code> </td> <td>{intl.get("HELP_MOVE_FORWARD")}</td>
              </tr>
              <tr>
                <td> <code>S</code> </td> <td>{intl.get("HELP_MOVE_BACKWARD")}</td>
              </tr>
              <tr>
                <td> <code>A</code> </td> <td>{intl.get("HELP_MOVE_LEFT")}</td>
              </tr>
              <tr>
                <td> <code>D</code> </td> <td>{intl.get("HELP_MOVE_RIGHT")}</td>
              </tr>
              <tr>
                <td> <code>R</code> </td> <td>{intl.get("HELP_FLY_UP")}</td>
              </tr>
              <tr>
                <td> <code>F</code> </td> <td>{intl.get("HELP_FLY_DOWN")}</td>
              </tr>
              <tr>
                <td> <code>Q</code> </td> <td>{intl.get("HELP_ROLL_RIGHT")}</td>
              </tr>
              <tr>
                <td> <code>E</code> </td> <td>{intl.get("HELP_ROLL_LEFT")}</td>
              </tr>
            </tbody>
          </table>
          :
          <table>
            <tbody>
              <tr>
                <td> <code>W</code> </td> <td>{intl.get("HELP_MOVE_FORWARD")}</td>
                <td> <code>R</code> </td> <td>{intl.get("HELP_FLY_UP")}</td>
              </tr>
              <tr>
                <td> <code>S</code> </td> <td>{intl.get("HELP_MOVE_BACKWARD")}</td>
                <td> <code>F</code> </td> <td>{intl.get("HELP_FLY_DOWN")}</td>
              </tr>
              <tr>
                <td> <code>A</code> </td> <td>{intl.get("HELP_MOVE_LEFT")}</td>
                <td> <code>Q</code> </td> <td>{intl.get("HELP_ROLL_RIGHT")}</td>
              </tr>
              <tr>
                <td> <code>D</code> </td> <td>{intl.get("HELP_MOVE_RIGHT")}</td>
                <td> <code>E</code> </td> <td>{intl.get("HELP_ROLL_LEFT")}</td>
              </tr>
            </tbody>
          </table>
        }
        {/* Up Down Left Right */}
        <table>
          <tbody>
            <tr> <td> <code>Up</code> </td> <td>{intl.get("HELP_ROTATE_UP")}</td> </tr>
            <tr> <td> <code>Down</code> </td> <td>{intl.get("HELP_ROTATE_DOWN")}</td> </tr>
            <tr> <td> <code>Left</code> </td> <td>{intl.get("HELP_ROTATE_LEFT")}</td> </tr>
            <tr> <td> <code>Right</code> </td> <td>{intl.get("HELP_ROTATE_RIGHT")}</td> </tr>
          </tbody>
        </table>
        {/* L Shift Space */}
        <table>
          <tbody>
            <tr> <td> <code>L</code> </td> <td>{intl.get("HELP_TOGGLE_LINK")}</td> </tr>
            <tr> <td> <code>shift</code> </td> <td>{intl.get("HELP_MOVE_FASTER")}</td> </tr>
            <tr> <td> <code>Space</code> </td> <td>{intl.get("HELP_TOGGLE_STEERING")}</td> </tr>
          </tbody>
        </table>
      </div>
    </DrawerWithHandle>
  );
}