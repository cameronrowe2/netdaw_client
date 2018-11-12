import React, { Component } from 'react';

class Header extends Component {
  constructor(){
    super();
  }

  handleClick(e) {
    this.props.addTrack()
  }

  handlePlay(){
    this.props.play()
  }

  handleStop(){
    this.props.stop()
  }

  render() {
    return (
      <div id="header">
        <div onClick={this.handlePlay.bind(this)}>Play</div>
        <div onClick={this.handleStop.bind(this)}>Stop</div>
        <div>Beginning</div>
        <div>Tempo</div>
        <div onClick={this.handleClick.bind(this)}>Add Track</div>
      </div>
    );
  }
}

export default Header;
