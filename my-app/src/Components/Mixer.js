import React, { Component } from 'react';
import Track from './Track'

class Mixer extends Component {

  deleteProject(_id){
    this.props.onDelete(_id)
  }

  render() {
    let tracks;
    if(this.props.projects){
      tracks = this.props.projects.map(project => {

        return (
          <Track project={project} onDelete={this.deleteProject.bind(this)} />
        )
      })
    }

    return (
      <div id="mixer">
        {tracks}
      </div>
    );
  }
}

export default Mixer;
