import React, { Component } from 'react';
import $ from 'jquery';

class RightClickMenu extends Component {

  handleAddMidiRegion(){
    console.log('handleAddMidiRegion')

    var elem = $('#arrange table tr:nth-child(' + (window.rcVars.arrrow + 1) + ') td:nth-child(' + (window.rcVars.arrcol + 2) + ')')

    // set color
    if(elem.closest("td").css("background-color") === "rgba(0, 0, 0, 0)" || elem.closest("td").css("background-color") === "rgb(255, 255, 255)") {

      window.arradd = true;
      console.log('white')
      // $(this).closest("td").css("background-color", "#000");
      elem.closest("td").addClass('region');
    } else {

      // window.arradd = false;
      // console.log('black')
      // $(this).closest("td").css("background-color", "#FFF");
    }

    window.arrVars = {
      arrrow: elem.closest("tr").index(),
      arrcol: elem.closest("td").index() - 1
    }

    this.props.addMidi()
  }

  handleExtendMidiRegion(){
    console.log('handleExtendMidiRegion')
  }

  render() {

    return (
      <div id="contextMenu" >
        <div>
          <p><a onClick={this.handleAddMidiRegion.bind(this)}>Add Midi Region</a></p>
          <p><a onClick={this.handleExtendMidiRegion.bind(this)}>Extend Midi Region</a></p>
        </div>
      </div>
    );
  }
}

export default RightClickMenu;
