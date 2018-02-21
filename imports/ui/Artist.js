import React, { Component } from 'react';
import { Tasks } from '../api/artists.js';
import { Meteor } from 'meteor/meteor'; 

// Artist component - represents a single artist item
export default class Artist extends Component {

	showArtistImage(){
		if(this.props.artist.images){
			let artist_img = document.createElement("img");
			artist_img.src = this.props.artis.images[0].url;
			artist_img.width = "100";
			artist_img.height = "100";
			//return "<img src='" + this.props.artist.images[0].url + "' width='100' height='100' />"
			ReactDOM.findDOMNode(this.refs.artistImage).appendChild(artist_img);
		}
		//else
			//return ""
	}

	render() {
		return (
			<div className="artist-profile-container">
				<div className="artist-image-container col-md-2">
					<img className="artist-image" src={this.props.artist.images.length > 0 ? this.props.artist.images[0].url : src="default_profile.jpg"} width="120" height="120" />
				</div>
				<div className="col-md-8">
					<ul>
					<li className="artist-info"> 
						<span className="artist-info"> 
							<b> {this.props.artist.name ? this.props.artist.name + "\n" : ''} </b>
						</span>
					</li>
					<li className="artist-info">
						<span className="artist-info">
							{this.props.artist.popularity ? "Popularity: " + this.props.artist.popularity + "\n" : ''}
						</span>
					</li>
					<li className="artist-info"> 
						<span className="artist-info">
							{this.props.artist.followers ? "Followers: " + this.props.artist.followers.total : ''}
						</span>
					</li>
					</ul>
				</div>
			</div>
    );
  }
}