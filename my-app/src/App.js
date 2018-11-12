import React, { Component } from 'react';
import Header from './Components/Header'
import Footer from './Components/Footer'
import Sidebar from './Components/Sidebar'
import Arrange from './Components/Arrange'
import PianoRoll from './Components/PianoRoll'
import Mixer from './Components/Mixer'
import './App.css';
import $ from 'jquery';
import * as F from './Functions.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      midiregions: [],
      currX: undefined,
      currY: undefined
    }

    $(document).ready(function(){

      $("body").keypress(function(e) {
        if ( e.which == 108 ) { // L

          var val = $('.selected_region').length
          console.log('length: ' + val)

          if(val == 1){
            // loop midi
            var tr = $('.selected_region').closest("tr").index() + 1
            console.log('row: ' + tr )

            var start = $('.selected_region').closest("td").index() + 1
            console.log('start: ' + start)

            var cols = $( "#arrange tr:nth-child(1) td" ).length

            for(var i = start + 1; i <= cols; i++){
              $('#arrange tr:nth-child(' + tr + ') td:nth-child(' + i + ')').css('background-color', '#BBB')

              // get notes
              var midiregions = window.midiregions

              var currY = tr - 1
              var currX = start - 2

              midiregions.forEach(function(v){

                if(v.x == currX && v.y == currY){

                  v.notes.forEach(function(v2,i2,a2){
                    F.val.addnote( ( (i - 2) * 4 ) + v2.bar, v2.pos, v2.note, currY)
                  })

                  // add each note


                  // a[i].notes.push({bar: bar, pos: pos, note: note})

                }
              })

              // add notes

            }
          }
        }
      });

    })
  }

  componentWillMount(){

    F.val.test()
    // F.val.play()

    $.ajax({
        url: 'http://localhost:3000/Project/get',
        data: {
          _id: "5b21019252748604594748af"
        },
        type: 'GET',
        success: function(data) {
          console.log(data)

          $.ajax({
              url: 'http://localhost:3000/Output_Track/get',
              data: {
                _id: "5b21019252748604594748ae"
              },
              type: 'GET',
              success: function(data2) {
                console.log(data2)
              }
          })

          $.ajax({
              url: 'http://localhost:3000/Mixer_Tracks/get',
              data: {
                _id: "5b21019252748604594748ad"
              },
              type: 'GET',
              success: function(data3) {
                console.log(data3[0].Tracks)

                var string = JSON.stringify(data3[0].Tracks)

                $.ajax({
                    url: 'http://localhost:3000/Track/getm',
                    data: {
                      ids: string
                    },
                    type: 'GET',
                    success: function(data4) {
                      console.log(data4)

                      var ids = []
                      
                      console.log('data4')
                      console.log(data4)

                      // data4.forEach(function(v){
                      //   console.log(v.Channel)
                      //   ids.push(v.Channel)
                      // })

                      // var string = JSON.stringify(ids)

                      // $.ajax({
                      //     url: 'http://localhost:3000/Channel/getm',
                      //     data: {
                      //       ids: string
                      //     },
                      //     type: 'GET',
                      //     success: function(data5) {
                      //       console.log(data5)


                      //     }
                      // })


                    }
                })

              }
          })
        }
    })



    this.setState({projects: [
      {
        _id: "1234",
        gain: 0.0
      },
      {
        _id: "5678",
        gain: 0.0
      }
    ]})
  }

  handleAddTrack(){
    var projects = this.state.projects
    projects.push({
      _id: "1234",
      gain: 0.0
    })
    this.setState({projects: projects})
  }

  handleDeleteProject(_id){
    var projects = this.state.projects
    let index = projects.findIndex(x => x._id === _id)
    projects.splice(index, 1)
    this.setState({projects: projects})
  }

  play(){
    F.val.play()
  }

  stop(){
    F.val.stop()
  }

  addnote(r, c){
    // alert('r: ' + r + ', c: ' + c)

    c = c - 1

    var b = Math.floor(c / 4)
    var p = c % 4
    // alert('b: ' + b + ', p: ' + p)

    r = r + ""

    var n = ""

    switch(r) {
      case "0":
      n = "Gs"
      break;

      case "1":
      n = "G"
      break;

      case "2":
      n = "Fs"
      break;

      case "3":
      n = "F"
      break;

      case "4":
      n = "E"
      break;

      case "5":
      n = "Ds"
      break;

      case "6":
      n = "D"
      break;

      case "7":
      n = "Cs"
      break;

      case "8":
      n = "C"
      break;

      case "9":
      n = "B"
      break;

      case "10":
      n = "As"
      break;

      case "11":
      n = "A"
      break;
    }

    var bar = b;
    var pos = p;
    var note = n + "2"

    // alert(n)

    var currX = this.state.currX
    var currY = this.state.currY

    F.val.addnote( ( currX * 4 ) + bar, pos, note, currY)

    // console.log('add midi note')
    // console.log('x: ' + x + ', y: ' + y)
    // console.log(this.state)
    var midiregions = this.state.midiregions



    console.log('currX: ' + currX)

    midiregions.forEach(function(v, i, a){
      console.log(v)
      if(v.x == currX && v.y == currY){
        a[i].notes.push({bar: bar, pos: pos, note: note})
      }
      console.log(v)
    })

    window.midiregions = this.state.midiregions
    // midiregions.push({x: x, y: y})
    // this.setState({midiregions: midiregions})
    // console.log(this.state)
  }

  removenote(r, c){

    c = c - 1

    // alert('r: ' + r + ', c: ' + c)
    var b = Math.floor(c / 4)
    var p = c % 4
    // alert('b: ' + b + ', p: ' + p)

    r = r + ""

    var n = ""

    switch(r) {
      case "0":
      n = "Gs"
      break;

      case "1":
      n = "G"
      break;

      case "2":
      n = "Fs"
      break;

      case "3":
      n = "F"
      break;

      case "4":
      n = "E"
      break;

      case "5":
      n = "Ds"
      break;

      case "6":
      n = "D"
      break;

      case "7":
      n = "Cs"
      break;

      case "8":
      n = "C"
      break;

      case "9":
      n = "B"
      break;

      case "10":
      n = "As"
      break;

      case "11":
      n = "A"
      break;
    }

    // alert(n)
    F.val.removenote(b, p, n + "2")
    // alert('remove note, b: ' + b + ", p: " + p + ", n: " + n)
  }

  handleMidi(x, y){
    console.log('handleMidi')

    $('#mixer').hide()
    $('#pianoroll').show()

    // clear notes
    // F.val.clearnotes()
    // clear (set) visual
    $('#pianoroll table td').css("background-color", "#FFF")


    this.state.currX = x
    this.state.currY = y

    var midiregions = this.state.midiregions
    var currX = this.state.currX
    var currY = this.state.currY
    midiregions.forEach(function(v, i, a){
      if(v.x == currX && v.y == currY){
        // a[i].notes
        console.log(v)

        // add notes
        v.notes.forEach(function(w){

          var pry = 0;

          switch(w.note) {
            case "Gs2":
            pry = 0
            break;

            case "G2":
            pry = 1
            break;

            case "Fs2":
            pry = 2
            break;

            case "F2":
            pry = 3
            break;

            case "E2":
            pry = 4
            break;

            case "Ds2":
            pry = 5
            break;

            case "D2":
            pry = 6
            break;

            case "Cs2":
            pry = 7
            break;

            case "C2":
            pry = 8
            break;

            case "B2":
            pry = 9
            break;

            case "As2":
            pry = 10
            break;

            case "A2":
            pry = 11
            break;
          }

          pry += 1

          var prx = (w.bar * 4) + w.pos + 1 + 1;

          // set note
          $('#pianoroll table tr:nth-child(' + pry +') td:nth-child(' + prx + ')').css("background-color", "#000")
        })
      }
    })

    console.log(this.state)
  }

  handleAddMidi(x, y){
    console.log('add midi region')
    var midiregions = this.state.midiregions
    midiregions.push({x: x, y: y, notes: []})
    this.setState({midiregions: midiregions})
    window.midiregions = this.state.midiregions
    console.log(this.state)
  }

  render() {

    return (
      <div className="App">
        <Header addTrack={this.handleAddTrack.bind(this)} play={this.play} stop={this.stop}/>
        <div id="content">
          <Sidebar />
          <Arrange projects={this.state.projects} openMidi={this.handleMidi.bind(this)} addMidi={this.handleAddMidi.bind(this)} />
          <Mixer projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)} />
          <PianoRoll send={this.addnote.bind(this)} remove={this.removenote}/>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
