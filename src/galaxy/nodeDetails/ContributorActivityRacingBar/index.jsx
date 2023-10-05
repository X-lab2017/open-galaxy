import RacingBar from './RacingBar';
import { PlayerButton } from './PlayerButton';
import { SpeedController } from './SpeedController';
import request from "../../service/request.js";

import React, { useState, useEffect, useRef } from 'react';
import { Space } from 'antd';
import intl from "react-intl-universal";
import {
  PlayCircleFilled,
  StepBackwardFilled,
  StepForwardFilled,
  PauseCircleFilled,
} from '@ant-design/icons';

export const ContributorActivityRacingBar = ({ repoName }) => {
  const [repoActivityDetails, setRepoActivityDetails] = useState(null);
  const [speed, setSpeed] = useState(1);
  const [playing, setPlaying] = useState(false);
  const mediaControlersRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://oss.x-lab.info/open_digger/github/${repoName}/activity_details.json`;
      const data = await request(url, {
        responseType: "json",
      });
      if (data.hasOwnProperty("error")) {
        throw `"${repoName}": ${data.error}`;
      }
      setRepoActivityDetails(data);
    }
    fetchData();
  }, [repoName]);

  if (!repoActivityDetails) return null;

  return (
    <div>
      <div className="hypertrons-crx-border hypertrons-crx-container">
        <div className="hypertrons-crx-title">
          <span>
            {intl.get('CONTRIBUTOR_ACTIVITY_RACING_BAR')}
          </span>
          <div className="hypertrons-crx-title-extra developer-tab">
            <Space>
              {/* speed control */}
              <SpeedController
                speed={speed}
                onSpeedChange={(speed) => {
                  setSpeed(speed);
                }}
              />

              {/* 3 buttons */}
              <Space size={3}>
                {/* last month | earliest month */}
                <PlayerButton
                  tooltip="Long press to the earliest"
                  icon={<StepBackwardFilled />}
                  onClick={mediaControlersRef.current?.previous}
                  onLongPress={mediaControlersRef.current?.earliest}
                />
                {/* play | pause */}
                <PlayerButton
                  icon={playing ? <PauseCircleFilled /> : <PlayCircleFilled />}
                  onClick={() => {
                    if (playing) {
                      mediaControlersRef.current?.pause();
                    } else {
                      mediaControlersRef.current?.play();
                    }
                  }}
                />
                {/* next month | latest month */}
                <PlayerButton
                  tooltip="Long press to the latest"
                  icon={<StepForwardFilled />}
                  onClick={mediaControlersRef.current?.next}
                  onLongPress={mediaControlersRef.current?.latest}
                />
              </Space>
            </Space>
          </div>
        </div>
        <div className="d-flex flex-wrap flex-items-center">
          <div className="col-12 col-md-8">
            <div style={{ margin: '10px 0 20px 20px' }}>
              <RacingBar
                ref={mediaControlersRef}
                speed={speed}
                data={repoActivityDetails}
                setPlaying={setPlaying}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributorActivityRacingBar;
