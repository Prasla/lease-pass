import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import GoogleMapReact from 'google-map-react';

class SearchResult extends Component {
	
	constructor(props) {
		super(props);

		this.state = {
			searchQuery: this.props.getQuery(),
			originalList: this.props.getList(),
			properties: [],
			minRent: 0,
			maxRent: 0,
			minBedroom: 0,
			maxBedroom: 0,
			minBathroom: 0,
			maxBathroom: 0,
			minCarport: 0,
			maxCarport: 0,
			rentValue: 0,
			bedroomValue: 0,
			bathroomValue: 0,
			carportValue: 0,
			googleMap: {
				zoom: 15,
				center: {
					lat: -37.959922,
					lng: 145.163403
				}
			}
		};
		
		this.doNoting = this.doNoting.bind(this);
		this.handleRangeChange = this.handleRangeChange.bind(this);
		this.handleBathroomChange = this.handleBathroomChange.bind(this);
		this.handleBedroomChange = this.handleBedroomChange.bind(this);
		this.handleCarportChange = this.handleCarportChange.bind(this);
		this.changePropertiesList = this.changePropertiesList.bind(this);
		this.onAvailNowClick = this.onAvailNowClick.bind(this);
		this.calculateMonths = this.calculateMonths.bind(this);
		
	}
	
	componentDidMount() {
		this.setState({
			properties: this.state.originalList,
		}, function(){this.setState({
				minRent: this.lowestRent(this.state.properties) === undefined ? 100: parseInt(this.lowestRent(this.state.properties)),
				maxRent: this.highestRent(this.state.properties) === undefined ? 1000: parseInt(this.highestRent(this.state.properties)),
				minBedroom: this.lowestBedroom(this.state.properties) === undefined ? 1: parseInt(this.lowestBedroom(this.state.properties)),
				maxBedroom: this.highestBedroom(this.state.properties) === undefined ? 1: parseInt(this.highestBedroom(this.state.properties)),
				minBathroom: this.lowestBathroom(this.state.properties) === undefined ? 1: parseInt(this.lowestBathroom(this.state.properties)),
				maxBathroom: this.highestBathroom(this.state.properties) === undefined ? 1: parseInt(this.highestBathroom(this.state.properties)),
				minCarport: this.lowestCarport(this.state.properties) === undefined ? 0: parseInt(this.lowestCarport(this.state.properties)),
				maxCarport: this.highestCarport(this.state.properties) === undefined ? 0: parseInt(this.highestCarport(this.state.properties)),
			}, function(){
				this.setState({
					rentValue: this.state.maxRent,
					bedroomValue: this.state.minBedroom,
					bathroomValue: this.state.minBathroom,
					carportValue: this.state.minCarport
				});
			})
		
		});
	}

	doNoting() {}
	
	changePropertiesList() {
		var temp = [];
		this.state.originalList.map(function(obj) {
			if( 
				parseInt(obj.rent) <= parseInt(this.state.rentValue) && 
				parseInt(obj.bedrooms) >= parseInt(this.state.bedroomValue) && 
				parseInt(obj.bathrooms) >= parseInt(this.state.bathroomValue) && 
				parseInt(obj.carspaces) >= parseInt(this.state.carportValue)
			) {
				temp.push(obj);
			}
		}.bind(this));
		return temp;
	}
	
	handleRangeChange(val) {
		this.setState({rentValue: val}, function(){
			this.setState({properties: this.changePropertiesList()});
		});
	}
	
	handleBedroomChange(event) {
		this.setState({bedroomValue: event.target.value}, function() {
			this.setState({properties: this.changePropertiesList()});
		});
	}
	
	handleBathroomChange(event) {
		this.setState({bathroomValue: event.target.value}, function(){
			this.setState({properties: this.changePropertiesList()});
		});
	}
	
	handleCarportChange(event) {
		this.setState({carportValue: event.target.value}, function(){
			this.setState({properties: this.changePropertiesList()});
		});
	}
	
	formateRangeValue(val) {
		return "$" + val;
	}
	
	highestRent(objArray) {
		return objArray.reduce(function(previous, entry) {
			return previous === undefined || entry.rent > previous ? entry.rent : previous;
		}, undefined);
	}
	
	lowestRent(objArray) {
		return objArray.reduce(function(previous, entry) {
			return previous === undefined || entry.rent < previous ? entry.rent : previous;
		}, undefined);
	}
	
	highestBedroom(objArray) {
		return objArray.reduce(function(previous, entry) {
			return previous === undefined || entry.bedrooms > previous ? entry.bedrooms : previous;
		}, undefined);
	}
	
	lowestBedroom(objArray) {
		return objArray.reduce(function(previous, entry) {
			return previous === undefined || entry.bedrooms < previous ? entry.bedrooms : previous;
		}, undefined);
	}
	
	highestBathroom(objArray) {
		return objArray.reduce(function(previous, entry) {
			return previous === undefined || entry.bathrooms > previous ? entry.bathrooms : previous;
		}, undefined);
	}
	
	lowestBathroom(objArray) {
		return objArray.reduce(function(previous, entry) {
			return previous === undefined || entry.bathrooms < previous ? entry.bathrooms : previous;
		}, undefined);
	}
	
	highestCarport(objArray) {
		return objArray.reduce(function(previous, entry) {
			return previous === undefined || entry.carspaces > previous ? entry.carspaces : previous;
		}, undefined);
	}
	
	lowestCarport(objArray) {
		return objArray.reduce(function(previous, entry) {
			return previous === undefined || entry.carspaces < previous ? entry.carspaces : previous;
		}, undefined);
	}
	
	onAvailNowClick(selection) {
		this.props.setSelection(selection);
		this.props.route.history.push('/IndividualView');
	}
	
	calculateMonths(dateString) {
	
		var today = new Date();
		var date = new Date(dateString);
		
		var one_day = 1000*60*60*24;

		var date1_ms = today.getTime();
		var date2_ms = date.getTime();

		var difference_ms = date2_ms - date1_ms;

		var days = Math.round(difference_ms/one_day);
		
		if(days > 30) {
			var months = Math.round(days/30);
			var monthText = " Month";
			if(months > 1) {
				monthText = " Months";
			}
			return "Due " + months + monthText;
		} else if(days > 0) {
			var dayText = " Day";
			if(days > 1) {
				dayText = " Days";
			}
			return "Due " + days + dayText;
		} else if(days === 0) {
			return "Due tomorrow"
		} else {
			return "Due Now";
		}
	}
	
	render() {
		
		var displayDiv = this.state.properties.map(function(property, index) {
			return (
				<div className="search-result-property-card" key={index}>
					<img src={property.images[0]} alt="property one image" width="100%" />
					<div className="row search-result-property-card-bar">
						<div className="col-lg-2">
							<p> ${property.rent} PW </p>
						</div>
						<div className="col-lg-4">
							<i className="fa fa-bed search-result-property-card-i"> 
								<p className="search-result-property-card-p"> {property.bathrooms}</p> 
							</i> 
							<i className="fa fa-bath search-result-property-card-i"> 
								<p className="search-result-property-card-p"> {property.bedrooms}</p> 
							</i>  
							<i className="fa fa-car search-result-property-card-i"> 
								<p className="search-result-property-card-p"> {property.carspaces}</p> 
							</i> 
						</div>
						<div className="col-lg-3">
							<p> {this.calculateMonths(property.available)} </p>
						</div>
						<div className="col-lg-3" >
							<button className="btn btn-primary" onClick={()=>this.onAvailNowClick(property)}>Avail Now</button>
						</div>
					</div>
				</div>
			);
		}.bind(this));
		
		return  (
			<div className="appliaction-main-body search-result-body">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="row serach-result-filter-bar">
								<div className="col-lg-3 col-md-6 col-sm-12 search-filter-bottom-margin">
									<span className="search-result-location-icon">
										<i className="fa fa-map-marker" aria-hidden="true"></i>
									</span>
									<input list="searchQuery" 
										className="form-control search-result-textBox search-result-location-text" 
										onChange={this.doNoting}
										value={this.state.searchQuery}
										type="text" 
										placeholder="Enter postcode or suburbs" 
										aria-label="Search" />
								</div>
								<div className="col-lg-3 col-md-6 col-sm-12 search-filter-bottom-margin">
									<Slider
										className="serach-result-range-filter"
										min={this.state.minRent}
										max={this.state.maxRent}
										value={this.state.rentValue}
										onChange={this.handleRangeChange}
										labels={{
											[this.state.minRent]: "$" + this.state.minRent,
											[this.state.maxRent]: "$" + this.state.maxRent 
										}}
										format={this.formateRangeValue}
									/>
								</div>
								<div className="col-lg-4 col-md-8 col-sm-12 search-filter-bottom-margin">		
									<i className="fa fa-bed">
										<input 
											className="serach-result-number-box-filter"
											type="number" 
											min= {this.state.minBedroom}
											max={this.state.maxBedroom}
											value={this.state.bedroomValue}
											onChange={this.handleBedroomChange}
										/>
									</i>
									<i className="fa fa-bath">
										<input 
											className="serach-result-number-box-filter"
											type="number" 
											min= {this.state.minBathroom}
											max={this.state.maxBathroom}
											value={this.state.bathroomValue}
											onChange={this.handleBathroomChange}
										/>
									</i>
									<i className="fa fa-car">
										<input 
											className="serach-result-number-box-filter"
											type="number" 
											min= {this.state.minCarport}
											max={this.state.maxCarport}
											value={this.state.carportValue}
											onChange={this.handleCarportChange} 
										/>
									</i>
								</div>
								<div className="col-lg-2 col-md-4 col-sm-12 search-filter-bottom-margin text-right">
									<div className="dropdown">
										<button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
											More Options
										</button>
										<form>
										<ul className="dropdown-menu serach-result-dropdown-ul">
											<li className="serach-result-dropdown-li">
												<span className="fa fa-tv serach-result-dropdown-span"></span> 
												Furnished property
												<label className="switch">
												  <input type="checkbox" />
												  <span className="slider"></span>
												</label>
											</li>
											<li className="serach-result-dropdown-li">
												<span className="fa fa-paw serach-result-dropdown-span"></span> 
												Allow pets
												<label className="switch">
												  <input type="checkbox" />
												  <span className="slider"></span>
												</label>
											</li>
											<li className="serach-result-dropdown-li">
												<span className="fa fa-fire serach-result-dropdown-span"></span> 
												Smoking permitted
												<label className="switch">
												  <input type="checkbox" />
												  <span className="slider"></span>
												</label>
											</li>
											<li className="serach-result-dropdown-li">
												<span className="fa fa-plus serach-result-dropdown-span"></span> 
												Extra facilities
												<label className="switch">
												  <input type="checkbox" />
												  <span className="slider"></span>
												</label>
											</li>
											<li className="serach-result-dropdown-li">
												<span className="fa fa-file serach-result-dropdown-span"></span> 
												Remaining lease
												<select className="serach-result-dropdown-select">
													<option value="0">Any</option>
													<option value="3">3 Months</option>
													<option value="6">6 Months</option>
													<option value="9">9+ Months</option>
												</select>
											</li>
										</ul>
										</form>
									</div>
									<div className="clearfix"></div>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-6">
									{displayDiv}
								</div>
								<div className="col-lg-6 google-map-col">
									<GoogleMapReact
									  bootstrapURLKeys={{ key: 'AIzaSyBF2Ode3HODlZYmJIFD4ujb0-1aHCek7No' }}
									  defaultCenter={this.state.googleMap.center}
									  defaultZoom={this.state.googleMap.zoom}
									>
									</GoogleMapReact>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default SearchResult;