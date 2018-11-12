import React, { Component } from 'react';

class Track extends Component {

  deleteProject(_id){
    this.props.onDelete(_id)
  }

  render() {

    return (
      <div className="Track">
        Track {this.props.project.gain} <a href="#" onClick={this.deleteProject.bind(this, this.props.project._id)}>X</a>
      </div>
    );
  }
}

export default Track;
