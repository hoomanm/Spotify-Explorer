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
      artist: [],
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
            else{
                console.log(JSON.parse(results));
                this.setState({artist: JSON.parse(results)});
            }
          }
      }
      catch(err){
          console.log("Error in Meteor Call: " + err);
      }
    }.bind(this));

    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }
 
  render() {
    return (
      <div className="container">
        <header>

          <h1>Search You Favorite Artist</h1>
          
          <form className="new-artist" onSubmit={this.getArtist.bind(this)} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type the name of the artist"/>
          </form>
          
        </header>

        <Artist key={this.state.artist.id} artist={this.state.artist} />
        
      </div>
    );
  }
}
