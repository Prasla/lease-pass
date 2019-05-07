import React, { Component } from 'react';
import $ from 'jquery';
import { ScaleLoader } from 'react-spinners';
import Autocomplete from 'react-autocomplete';



import WhatIsIt from './UIComponents/WhatIsIt';
import WhoAreWe from './UIComponents/WhoWeAre';
import ReachOut from './UIComponents/ReachOut';

class Home extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
		  query : "",
		  suburbList : [],
		  availableProperties: [],
		  loading: false
		}
		
		this.onInputChange = this.onInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onSelect = this.onSelect.bind(this);
	}
	
	onInputChange(event) {
		console.log(event);
		var val = event.target.value.trim();
		
		if(this.state.query !== "" && this.state.query.length > 2) {
			this.setState({query: val}, this.getSuburbs);
		} else {
			this.setState({query: val});
		}
		
	}

	getSuburbs() {
		$.getJSON('https://us-central1-lease-pass-prod.cloudfunctions.net/suburbs?q='+this.state.query).then(
			(res) => {
				if(res.length > 0) {
					this.setState({suburbList : res});
				}
				
			}
		)
	}
	
	handleSubmit() {
		//var stateName = "";
		var stateName = this.state.query;
		/*var opts = document.querySelectorAll('#searchQuery option');
		
		console.log(inputValue);
		console.log(opts);
		
		for(var i = 0; i < opts.length; i++) {
			var opt = opts[i];
			if(opt.innerText.trim() === inputValue.trim()) {
				stateName = opt.getAttribute('data-value');
				break;
			}
		}*/
		if(stateName !== null && stateName !== "") {
			this.getProperties(stateName);
		} else {
			this.errorDisplay();
		}
	}
	
	goToResultPage(history) {
		this.setState({
			loading: false
		});
		this.props.setProperties(this.state);
		this.props.route.history.push('/SearchResult');
	}
	
	getProperties(stateName) {
		this.setState({
			loading: true
		}, function(){
			$.getJSON('https://us-central1-lease-pass-prod.cloudfunctions.net/listings?state='+stateName).then(
				(res) => {
					this.setState({availableProperties: res}, this.goToResultPage);
				}
			);
		});
	}
	
	errorDisplay() {
		var x = document.getElementById("toaster");
		x.className = "show";
		setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
	} 
	
	componentDidUpdate(pass, current) {
		if(current.suburbList.length !== 0) {
			console.log("open data list");
		}
	}
	
	renderItem(item, isHighlighted, a, b){
        return (
            <div className="text-left" >{item.name + "," + item.postcode + "," + item.state}</div>   
        ); 
    }
	
	getItemValue(item) {
        return item.state;
    }
	
	onSelect(val){
		console.log(val);
        this.setState({
            query: val
        });
    }
	
	render() {

		return  (
			<div className="appliaction-main-body">
				<header className="masthead" id="page-top">
				  <div className="container">
					<div className="intro-text">
					  <div className="row align-items-center">
						<div className="col-lg-12 col-asd">
							<h3>looking for your next rental?</h3>
							<h1>Lease transfers, made easy</h1>
						</div>
						<div className="col-lg-10 offset-lg-1 col-asd">
							<div className="input-group">
								<div className="input-group-prepend">
									<span className="input-group-text search-icon">
										<i className="fa fa-map-marker" aria-hidden="true"></i>
									</span>
								</div>
								<Autocomplete
									placeholder="Enter postcode or suburbs" 
									getItemValue={this.getItemValue}
									items={this.state.suburbList}
									renderItem={this.renderItem}
									value={this.state.query}
									onChange={this.onInputChange}
									onSelect={this.onSelect}
									inputProps={{ style: { width: '790px', height: '46px' } }}
									//wrapperStyle={{ width: 1000 }}
								/>
								<button className="btn btn-lg search-button" onClick={this.handleSubmit}  type="button">Search</button>
							</div>
							<ScaleLoader
								className="loading-spin"
								height={50}
								width={8}
								margin={"5px"}
								radius= {0}
								color={'#e83225'}
								loading={this.state.loading}
							/>
						</div>
						<div className="col-lg-6 offset-lg-6 col-asd">
						  <a href="https://itunes.apple.com/au/app/leasep,ass/id1338409018?mt=8" className="btn btn-app-store mb-3" target="_blank"> <i className="fa fa-apple"></i> <span className="small">Available on the</span> <span className="big">App Store</span></a>
							<a href="https://play.google.com/store/apps/details?id=au.com.leasepass.app" className="btn btn-app-store mb-3" target="_blank"> <i className="fa fa-android"></i> <span className="small">Get it on</span> <span className="big">Google play</span></a>
						</div>
					  </div>
					</div>
				  </div>
				</header>
				
				<WhatIsIt></WhatIsIt>
				
				<WhoAreWe></WhoAreWe>
				
				<ReachOut></ReachOut>
				
			</div>
		);
	}
}
export default Home;