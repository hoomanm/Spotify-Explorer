import React, { Component } from 'react';
import { Tasks } from '../api/artists.js';
import { Meteor } from 'meteor/meteor'; 
import Track from './Track.js';

// Album component - represents an album item
export default class Album extends Component {

	constructor(props){

		super(props);

		this.state = {
			album_tracks: [],
			hideTracks: false,
		};
	}

	getTracks(){
		album_tracks = [];
		Meteor.call('getAlbumTracks', this.props.album.id, function(error, results) {
			try {
				if(results == "NotFound")
					alert("No tracks found for this album!");
				else {
					if (error)
						console.log("Error in retrieving album's tracks data: " + error);
					else {
						results.map((track) => {
						album_tracks.push(track);
					});
					this.setState({
						album_tracks: album_tracks
					});
            		}
				}
				console.log(album_tracks)
			}
			catch(err){
				console.log("Error in Meteor Call: " + err);
			}
		}.bind(this));

		this.setState({
      		hideTracks: !this.state.hideTracks,
    	});
	}

	render() {

		const tracks = [];

		for (var i = 0; i < this.state.album_tracks.length; i += 1) {
			console.log(this.state.album_tracks[i]['id'])
      		tracks.push(<Track key={this.state.album_tracks[i]['id']} track={this.state.album_tracks[i]} />);
    	};

		return (
			<ul>
				<li className="album-info"> 
					<img className="img-thumbnail" src={this.props.album['images'][0]['url']} width="55" height="55" />
					&nbsp; <button className="album-link" onClick={this.getTracks.bind(this)} > {this.props.album['name']} </button>
					<ul> {this.state.hideTracks ? tracks: ''} </ul>
				</li>
				
			</ul>
		);
	}

}