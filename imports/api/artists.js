import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http'
 
export const Artists = new Mongo.Collection('artists');

if (Meteor.isServer) {

	Meteor.methods({

		'getArtistInfo'(artistName){
			let access_token = "BQAn7NzBXgPXwZXsVz9IH0TzuHtJ8zBt0Bgc-Q9KoniyNjdNQYriEwTn_VMp6ROAo2DCVowY99PT0yab28Q"
			
			// First HTTP Call to get artist id
			let url = "https://api.spotify.com/v1/search"
			let first_artist_id = '';
			try{
			    let callResult = HTTP.call('GET', url, 
					{params: {"q": artistName, "type": "artist", "limit": 10},
					 headers: {"Authorization": " Bearer " + access_token}});
			    
			    artists = JSON.parse(callResult.content);
			    if(artists["artists"]["total"] == 0)
			    	return "NotFound"
			    else {
			    	console.log(artists["artists"]["items"])
			    	return artists["artists"]["items"]
			    	//first_artist_id = artists["artists"]["items"][0]["id"]
					//console.log("Artist:\n" + artists["artists"]["items"][0]["name"]);
				}
			}
			catch(callErr){
			    console.log("Call Error: " + callErr);
			    return "NotFound"
			}

			// Second HTTP Call to get artist information
			// url = "https://api.spotify.com/v1/artists/" + first_artist_id
			// let result = '';
			// try{
			//     let callResult = HTTP.call('GET', url, 
			// 		{headers: {"Authorization": " Bearer " + access_token}});

			//     result = callResult.content;
			// 	console.log(result);
			// 	return result;
			// }
			// catch(callErr){
			//     console.log("Call Error: " + callErr);
			//     return "NotFound"
			// }
		},

	});

}













