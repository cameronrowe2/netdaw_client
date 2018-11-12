export var val = {
  notes: [],
  oscillatorNode: null,
  audioCtx: null,
  gain: {},
  A:  55.00,
  As: 58.27,
  B:  61.74,
  C:  65.41,
  Cs: 69.30,
  D:  73.42,
  Ds: 77.78,
  E:  82.41,
  F:  87.31,
  Fs: 92.50,
  G:  98.00,
  Gs: 103.83,

  pos: function(b, p){
    return (b * 60/128 ) + (p * 60/128/4 )
  },

  test: function(){

    for(var i = 1; i < 5; i++){
      val["A"+i] =  val.A * i
      val["As"+i] = val.As * i
      val["B"+i] =  val.B * i
      val["C"+i] =  val.C * i
      val["Cs"+i] = val.Cs * i
      val["D"+i] =  val.D * i
      val["Ds"+i] = val.Ds * i
      val["E"+i] =  val.E * i
      val["F"+i] =  val.F * i
      val["Fs"+i] = val.Fs * i
      val["G"+i] =  val.G * i
      val["Gs"+i] = val.Gs * i
    }

    console.log(val)

    // Audio
    val.audioCtx = new (window.AudioContext || window.webkitAudioContext)(); // define audio context
  },

  addnote: function(bar, part, note, track){
    val.notes.push({bar: bar, part: part, note: val[note], track: track})
  },

  removenote: function(b, p, n){
    console.log('b: ' + b + ", p: " + p + ", n: " + n)
    var index;
    val.notes.forEach(function(v,i){
      console.log(v)
      console.log(v.bar + " " + v.part + " " + v.note + " ")
      if(v.bar == b && v.part === p && v.note == val[n]) {
        index = i
      }
    })
    console.log(index)
    val.notes.splice(index, 1)
  },

  getnotes: function(){
    return val.notes
  },

  clearnotes: function(){
    val.notes = []
  },

  setnotes: function(n){
    val.notes = n
  },

  play: function(){
    console.log(val.notes)
    // val.note( val.pos(0, 0), val.C4)
    // val.note( val.pos(0, 1), val.A2)
    // // val.play( val.pos(0, 0), val.A2, v/2, 1)
    // val.note( val.pos(0, 2), val.C2)
    // val.note( val.pos(0, 3), val.G1)
    // // val.play( val.pos(0, 3), val.C2, v/2, 1)
    // val.note( val.pos(1, 0), val.C2)
    // val.note( val.pos(1, 1), val.F1)
    // // val.play( val.pos(1, 1), val.A2, v/2, 1)
    // val.note( val.pos(1, 2), val.C2)
    // val.note( val.pos(1, 3), val.F1)

    for(var i = 0; i < val.notes.length; i++){
      val.note( val.pos( val.notes[i].bar, val.notes[i].part), val.notes[i].note, val.notes[i].track )
    }
  },

  note: function(v, f, t){

    var l = 60/128/4/2;

    var g = 1

    val.oscillatorNode = val.audioCtx.createOscillator();
    val.oscillatorNode.type = 'square';
    val.oscillatorNode.frequency.setValueAtTime(f, val.audioCtx.currentTime); // value in hertz

    if(val.gain[t] == undefined){
      val.gain[t] = val.audioCtx.createGain()
      val.gain[t].gain.setValueAtTime(g, val.audioCtx.currentTime);
      val.gain[t].connect(val.audioCtx.destination);
    }

    val.oscillatorNode.connect(val.gain[t]);

    val.oscillatorNode.start(val.audioCtx.currentTime + v);
    val.oscillatorNode.stop(val.audioCtx.currentTime + l + v);
  },

  stop: function(){
    val.oscillatorNode.stop();
  },

  add: function(x,y) {
    return x + y
  }
}
