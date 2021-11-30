import React from "react";
import './PlayButton.less';

class PlayButton extends React.Component {
  render() {
    if (this.props.hide) return null;
    return (
      <div>
        <button className='play-button' onClick={this.props.play}>
          播放
        </button>
      </div>
    );
  }
}
export default PlayButton;
