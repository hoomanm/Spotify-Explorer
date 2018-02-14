import React, { Component } from 'react';
import { Tasks } from '../api/artists.js';
import { Meteor } from 'meteor/meteor'; 

// Artist component - represents a single artist item
export default class Artist extends Component {

	render() {
		return (
			<ul>
			<li> 
				<span className="artist-info"> 
					{this.props.artist.name ? "Name: " + this.props.artist.name + "\n" : ''}
				</span>
			</li>
			<li>
				<span className="artist-info">
					{this.props.artist.popularity ? "Popularity: " + this.props.artist.popularity + "\n" : ''}
				</span>
			</li>
			<li> 
				<span className="artist-info">
					{this.props.artist.followers ? "Followers: " + this.props.artist.followers.total : ''}
				</span>
			</li>
				<li className="artist-image"> <img src={this.props.artist.images ? this.props.artist.images[0].url : ''} width="100" height="100" /> </li>
			</ul>
    );
  }
}