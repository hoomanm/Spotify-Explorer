import React, { Component } from 'react';
import { Tasks } from '../api/artists.js';
import { Meteor } from 'meteor/meteor'; 

// Song component - represents an album item
export default class Track extends Component {

	render() {
		return (
			<li className="track-item"> 
				<span> {this.props.track.name} </span> <br/>
				<audio controls="controls">
  					<source src={this.props.track.preview_url} type="audio/mpeg" />
				</audio>
			</li>
		);
	}

}