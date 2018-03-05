import React, { Component } from 'react';
import { Tasks } from '../api/artists.js';
import { Meteor } from 'meteor/meteor'; 

// Album component - represents an album item
export default class Album extends Component {

	render() {
		return (
			<li className="album-info"> 
				<img className="img-thumbnail" src={this.props.album['images'][0]['url']} width="55" height="55" /> &nbsp; {this.props.album['name']} 
			</li>
		);
	}

}