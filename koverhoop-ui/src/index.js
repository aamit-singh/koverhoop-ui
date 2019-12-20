import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class YearSelect extends React.Component{
	constructor(){
		super();
		let year = new Date();
		year = year.getFullYear();
		let blank = new Array(80)
		this.years = Array.from(blank,(vals, index) => year - index);
	}
	render() {
	return(
		<select>
		 { this.years.map((year, index) => {
			 return <option key={`year${index}`} value={year}>{year}</option>
		   })
		 }
		</select>
	);
}
}
class SearchBar extends React.Component {
	constructor(){
		super();
		this.state={
			query : "",
			year : 2019,
			type : ""
		};
	}
	
	
	
	render(){
		return (
		<div>
		<input type="text" id="serach query" />
		<YearSelect />
		</div>
		);
	}
}



ReactDOM.render(<SearchBar />, document.getElementById('root'));

