import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
 
import { Tasks } from '../api/artists.js';
import Artist from './Artist.js';
 
// App component - represents the whole app
export default class App extends Component {

    constructor(props) {
        super(props);
 
        this.state = {
            artists: [],
        };
    }

    getArtist(event){
        event.preventDefault();
        const artistName = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        Meteor.call('getArtistInfo', artistName, function(error, results) {
            try{
                console.log(results);
                if(results == "NotFound")
                    alert("Artist Not Found");
                else {
                    if (error)
                        console.log("Error in retrieving artist data: " + error);
                    else {
                        let artists_list = []
                        results.map((artist) => {
                            console.log(artist)
                            artists_list.push(artist)
                        });

                    //console.log(artists_list)
                    this.setState({artists: artists_list});
                    }
                }
            }
            catch(err) {
                console.log("Error in Meteor Call: " + err);
            }
        }.bind(this));

        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    showArtistInfo(artist){
        console.log("showArtistInfo");
        console.log(artist);
  
        ReactDOM.render(<Artist key={artist['id']} artist={artist} summary={false}/>, document.getElementById('artist-profile'));
    }

    showSearchResults(){
        return this.state.artists.map((artist) => {
            if(artist.name)
                return (<li key={artist.id} className="search-result-item"> 
                    <a className="search-result-link" href="#" onClick={this.showArtistInfo.bind(this, artist)}> {artist['name']} </a>
                </li>
                );
        });
    }
 
    render() {
        return (
            <div>
                <div className="container col-md-3">
                    <header>
                        <h1 className="search-header">Search Your Favorite Artist</h1>
                        <form className="new-artist" onSubmit={this.getArtist.bind(this)} >
                            <input
                            type="text"
                            ref="textInput"
                            placeholder="Type the name of the artist"/>
                        </form>
                    </header>
                    <ul>
                        {this.showSearchResults()}
                    </ul>
                </div>
                <div id="artist-profile" className="col-md-5">
                </div> 
                <div id="compare-artists" className="col-md-3">
                </div> 
            </div>       
        );
    }
}
