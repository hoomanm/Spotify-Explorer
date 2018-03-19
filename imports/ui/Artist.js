import React, { Component } from 'react';
import { Tasks } from '../api/artists.js';
import { Meteor } from 'meteor/meteor'; 
import ReactDOM from 'react-dom';
import Album from './Album.js';
import { render } from 'react-dom';
import BarChart from './BarChart.js';

// Artist component - represents a single artist item
export default class Artist extends Component {

	constructor(props) {
    	super(props);
 
    	this.state = {
      		artist_albums: [],
      		related_artists: [],
      		showInfo: "",
    	};
  	}

	// componentDidMount() {
	// }

	getAlbums() {
		artist_albums = [];
		Meteor.call('getArtistAlbums', this.props.artist.id, function(error, results) {
			try {
				console.log(results);
				if(results == "NotFound")
					alert("No albums found for this artist!");
				else {
					if (error)
						console.log("Error in retrieving artist albums data: " + error);
					else {
						results.map((album) => {
						artist_albums.push(album);
					});
					this.setState({artist_albums: artist_albums});
					this.setState({showInfo: "albums"});
            		}
				}
				console.log(artist_albums)
			}
			catch(err){
				console.log("Error in Meteor Call: " + err);
			}
		}.bind(this));
	}

	getRelatedArtists() {
		related_artists = [];
		Meteor.call('getRelatedArtists', this.props.artist.id, function(error, results) {
			try {
				console.log(results);
				if(results == "NotFound")
					alert("No related artists found for this artist!");
				else {
					if (error)
						console.log("Error in retrieving related artists data: " + error);
					else {
						results.map((related_artist) => {
						related_artists.push(related_artist);
					});
					this.setState({related_artists: related_artists});
					this.setState({showInfo: "relatedArtists"});
            		}
				}
				console.log(related_artists)
			}
			catch(err){
				console.log("Error in Meteor Call: " + err);
			}
		}.bind(this));
	}

	compareArtists() {
		//alert("Compare " + this.props.parent_artist + " with " + this.props.artist);
		render(<BarChart key={this.props.artist.id} artists={[this.props.parent_artist, this.props.artist]} />, document.getElementById('compare-artists'));
	}

	render() {

		const albums = [];
		const related_artists = [];

    	for (var i = 0; i < this.state.artist_albums.length; i += 1) {
      		albums.push(<Album key={this.state.artist_albums[i]['id']} album={this.state.artist_albums[i]} />);
    	};

    	for (var i = 0; i < this.state.related_artists.length; i += 1) {
      		related_artists.push(<Artist key={this.state.related_artists[i]['id']} artist={this.state.related_artists[i]} parent_artist={this.props.artist} summary={true} />);
    	};

    	if(!this.props.summary)
			return (
				<div className="artist-profile-container col-md-12">
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
					<div className="artist-albums-container col-md-12">
						<button className="btn btn-info artist-info-button" onClick={this.getAlbums.bind(this)}> Show Albums </button>
						<button className="btn btn-info artist-info-button" onClick={this.getRelatedArtists.bind(this)}> Show Related Artists </button>
						<div> {this.state.showInfo == "albums" ? albums : (this.state.showInfo == "relatedArtists" ? related_artists : '')} </div>
					</div>
				</div>
	    	);
		else
			return (
				<div className="artist-profile-summary-container col-md-12">
					<img className="artist-image" src={this.props.artist.images.length > 0 ? this.props.artist.images[0].url : src="default_profile.jpg"} width="60" height="60" />
					<button className="link" onClick={this.compareArtists.bind(this)}> <b> {this.props.artist.name ? this.props.artist.name + "\n" : ''} &nbsp; </b> </button>
					<span> {this.props.artist.popularity ? "Popularity: " + this.props.artist.popularity + "\n" : ''} &nbsp; </span>
					<span> {this.props.artist.followers ? "Followers: " + this.props.artist.followers.total : ''} &nbsp; </span>
				</div>
	    	);
	}
}