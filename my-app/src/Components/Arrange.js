import React, { Component } from 'react';
import $ from 'jquery';

class Arrange extends Component {
  constructor(){
    super()

    $(document).ready(function(){
        $('#arrange table').on( 'dblclick', 'td', function () {

            if($(this).closest("td").css("background-color") === "rgba(0, 0, 0, 0)" || $(this).closest("td").css("background-color") === "rgb(255, 255, 255)") {

              window.arradd = true;
              console.log('white')
              // $(this).closest("td").css("background-color", "#000");
              $(this).closest("td").addClass('region');
            } else {

              // window.arradd = false;
              // console.log('black')
              // $(this).closest("td").css("background-color", "#FFF");
            }

            window.arrVars = {
              arrrow: $(this).closest("tr").index(),
              arrcol: $(this).closest("td").index() - 1
            }
        });

        $('#arrange table').on( 'click', 'td', function () {

            if($(this).closest("td").css("background-color") === "rgba(0, 0, 0, 0)" || $(this).closest("td").css("background-color") === "rgb(255, 255, 255)") {

              window.openmidi = false;
              // console.log('white')
              // $(this).closest("td").css("background-color", "#000");
            } else {
              window.openmidi = true;
              // window.arradd = false;
              console.log('check')
              $('#arrange table td').removeClass('selected_region')
              $(this).closest("td").addClass('selected_region');
            }
            window.arrOVars = {
              arrrow: $(this).closest("tr").index(),
              arrcol: $(this).closest("td").index() - 1
            }

        });

    });
  }

  addmidi(){

    if( window.arradd ){
      window.arradd = false

      this.props.addMidi(window.arrVars.arrcol, window.arrVars.arrrow)
    }

  }

  openmidi(){
    if(window.openmidi){
      // open midi region
      this.props.openMidi(window.arrOVars.arrcol, window.arrOVars.arrrow)
    }

  }

  render() {

    var rows = []
    var sections = []

    var len = this.props.projects.length

    for(var j = 0; j < len; j++){
      sections = []

      for(var i = 0; i < 48; i++){
        sections.push(<td onDoubleClick={this.addmidi.bind(this)} onClick={this.openmidi.bind(this)} ></td>)
      }

      rows.push(<tr><td>Track</td>{sections}</tr>)
    }

    return (
      <div id="arrange">
        <table>
          {rows}
        </table>
      </div>
    );
  }
}

export default Arrange;
