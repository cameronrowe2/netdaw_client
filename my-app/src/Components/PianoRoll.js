import React, { Component } from 'react';
import $ from 'jquery';

class PianoRoll extends Component {
  constructor(){
    super()
    $(document).ready(function(){
        $('#pianoroll table').on( 'click', 'td', function () {
            // console.log('Row ' + $(this).closest("tr").index() + ', Column ' + $(this).closest("td").index());

            console.log( $(this).closest("td").css("background-color") )

            if($(this).closest("td").css("background-color") === "rgba(0, 0, 0, 0)" || $(this).closest("td").css("background-color") === "rgb(255, 255, 255)") {

              window.add = true;
              console.log('white')
              $(this).closest("td").css("background-color", "#000");
            } else {

              window.add = false;
              console.log('black')
              $(this).closest("td").css("background-color", "#FFF");
            }

            window.myVars = {
              row: $(this).closest("tr").index(),
              col: $(this).closest("td").index()
            }

        });
    });
  }

  sendnote(){
    if(window.add){
      this.props.send(window.myVars.row, window.myVars.col)
    } else { // remove
      this.props.remove(window.myVars.row, window.myVars.col)
    }

  }

  render() {

    let columns = [];
    let rows = [];


    for(var i = 0; i < 16; i++){
      columns.push(<td onClick={this.sendnote.bind(this)}></td>)
    }

    for(var i = 0; i < 12; i++){
      columns = []

      var v = ""
      i = i + ""

      switch(i){
        case "0":
        v = "Gs"
        break;

        case "1":
        v = "G"
        break;

        case "2":
        v = "Fs"
        break;

        case "3":
        v = "F"
        break;

        case "4":
        v = "E"
        break;

        case "5":
        v = "Ds"
        break;

        case "6":
        v = "D"
        break;

        case "7":
        v = "Cs"
        break;

        case "8":
        v = "C"
        break;

        case "9":
        v = "B"
        break;

        case "10":
        v = "As"
        break;

        case "11":
        v = "A"
        break;
      }

      columns.push(<td>{v}</td>)

      for(var j = 0; j < 16; j++){
        columns.push(<td onClick={this.sendnote.bind(this)}></td>)
      }

      rows.push(<tr>{columns}</tr>)
    }

    // tracks = this.props.projects.map(project => {
    //   console.log(project)
    //
    //   return (
    //     <Track project={project} onDelete={this.deleteProject.bind(this)} />
    //   )
    // })


    return (
      <div id="pianoroll">
        <table>
          {rows}
        </table>
      </div>
    );
  }
}

export default PianoRoll;
