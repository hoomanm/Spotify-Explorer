import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import ReactDOM from 'react-dom';

// BarChart component - displays the bar chart to compare artists
export default class BarChart extends Component {
 
    render() {
    	console.log("Bar Charttttttt!")
    	console.log(this.props.artists[0].followers.total)
        return (
          <div>
		      <div className='popularity-chart-container'>
		        <Chart
		          chartType = "BarChart"
		          data = {[['Artist', 'Popularity', {role: "style"}], [this.props.artists[0].name, this.props.artists[0].popularity, "#52AD0C"], [this.props.artists[1].name, this.props.artists[1].popularity, "#6ADF83"]]}
		          options = { {title: "Popularity",
	        				  bar: {groupWidth: "90%"},
	        				  legend: { position: "none" },
	        				  titleTextStyle: {
	        				  	color: '#2E722D',
	        				  	fontSize: 14
	        				  }
	        	  }}
		          graph_id="PopularityChart"
		          width="100%"
		          height="200px"
		          legend_toggle />
		      </div>
		      <hr/>
		      <div className='followers-chart-container'>
		        <Chart
		          chartType = "BarChart"
		          data = {[['Artist', 'Followers', {role: "style"}], [this.props.artists[0].name, this.props.artists[0].followers.total, "#1172A3"], 
		          									[this.props.artists[1].name, this.props.artists[1].followers.total, "#6AC1DF"]]}
		          options = { {title: "Followers",
	        				  bar: {groupWidth: "90%"},
	        				  legend: { position: "none" },
	        				  titleTextStyle: {
	        				  	color: '#0C5796',
	        				  	fontSize: 14
	        				  }
	        	  }}
		          graph_id="FollowersChart"
		          width="100%"
		          height="200px"
		          legend_toggle />
		      </div>
		  </div>
    	);
    }
}