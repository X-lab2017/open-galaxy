import RacingBar from './RacingBar';
import { PlayerButton } from './PlayerButton';
import { SpeedController } from './SpeedController';
import request from "../../service/request.js";
import { getMonthlyData } from './data';

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
      try {
        const data = await request(url, {
          responseType: "json",
        });
        setRepoActivityDetails(data);
      } catch (error) {
        setRepoActivityDetails(null);
      }
    }
    fetchData();
  }, []);

  if (!repoActivityDetails) return null;

  return (
    <div className="contributor-activity-racing-bar">
      <h4 className="text-center">
        {intl.get('CONTRIBUTOR_ACTIVITY_RACING_BAR')}
      </h4>
      {/* media player */}
      <div className="media-player">
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
            {/* previous month | earliest month */}
            <PlayerButton
              tooltip="Long press to the earliest"
              icon={<StepBackwardFilled />}
              onClick={() => mediaControlersRef.current?.previous()}
              onLongPress={() => mediaControlersRef.current?.earliest()}
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
              onClick={() => mediaControlersRef.current?.next()}
              onLongPress={() => mediaControlersRef.current?.latest()}
            />
          </Space>
        </Space>
      </div>
      {/* the racing bar */}
      <RacingBar
        ref={mediaControlersRef}
        speed={speed}
        data={getMonthlyData(repoActivityDetails)}
        setPlaying={setPlaying}
      />
    </div>
  );
};

export default ContributorActivityRacingBar;
