import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//omdb api initializer 
const omdb = new (require('omdbapi'))('8f1e3a0b');




class YearSelect extends React.Component{
	constructor(props){
		super(props);
		let year = new Date();
		year = year.getFullYear();
		let blank = new Array(80);
		this.years = Array.from(blank,(vals, index) => year - index);
	}
	render() { 
	return(
		<select onChange = {(event) => {this.props.yearchange(event.target.value)}} >
		 { this.years.map((year, index) => {
			 return <option key={`year${index}`} value={year}>{year}</option>
		   })
		 }
		</select>
	);
}
}


class SearchBar extends React.Component {
	constructor(props){
		super(props);
		this.state={
			query : "",
			year : 2019,
			type : ""
		};
	}
	yearchange(y){
		this.setState({ year: y})
	}
	
	
	render(){
		var handleclick = this.props.handleClick
		return (
		<div>
		<input type="text" id="search query" onChange={(event) => {this.setState({ query: event.target.value });}} />
		<YearSelect yearchange={()=>{this.yearchange()}} />
		<select id="SME" onChange = {(event) => {this.setState({ type: event.target.value });}}  >
		<option key = '1' value="Series">Series</option>
		<option key = '2' value="Movie">Movie</option>
		<option key = '3' value="Episode">Episode</option>
		</select>
		<button onClick={() => {handleclick(this.state)}} > Search </button>
		</div>
		);
	}
}

class SearchResults extends React.Component{
	constructor(props){
		super(props);
		this.state={result:""}
	}
	render(){
		return(
			<div>
			</div>
		);
	}
}
class App extends React.Component {
	constructor(){
		super();
		this.state = { Results: null}
	}
	
	handleClick(Query){
		if(Query.query !== ""){
			var values=[];
			var result = omdb.search({
			search: Query.query,  // required
			type: Query.type,             // optionnal  ['series', 'episode', 'movie']
			year: Query.year,               // optionnal
			page: '1'                   // optionnal (1 to 100)
			}).then((response=>{values.push(response)})).catch(console.error);
			this.setState( {Results: result})
			console.log(values)
		}
		else{
			alert("query cannot be empty!");
		}
	}
	
	render(){
		
		
	return(
		<div>
		<SearchBar handleClick={(Query) => {this.handleClick(Query)}} />
		/*<SearchResults results={this.state.Results||[1]} />*/
		</div>
	);
	}
}


ReactDOM.render(<App />, document.getElementById('root'));










