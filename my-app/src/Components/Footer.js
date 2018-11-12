import React, { Component } from 'react';
import $ from 'jquery';

class Footer extends Component {

  handleMixer(){
    $('#mixer').show();
    $('#pianoroll').hide()
  }

  handlePianoRoll(){
    $('#mixer').hide();
    $('#pianoroll').show()
  }

  render() {

    return (
      <div id="footer">
        <div onClick={this.handleMixer.bind(this)}>Mixer</div>
        <div onClick={this.handlePianoRoll.bind(this)}>Piano Roll</div>
      </div>
    );
  }
}

export default Footer;
