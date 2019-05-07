import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Carousel } from 'react-responsive-carousel';

class IndividualView extends Component {
	
	constructor(props) {
		super(props);

		this.state = {
			property: this.props.getSelection(),
			query: this.props.getQuery(),
			googleMap: {
				zoom: 15,
				center: {
					lat: -37.959922,
					lng: 145.163403
				}
			}
		};
		
		this.calculateMonths = this.calculateMonths.bind(this);
		this.goToLogin = this.goToLogin.bind(this);
	}
	
	goToLogin() {
		
	}
	
	calculateMonths() {
	
		var today = new Date();
		var date = new Date(this.state.property.expiry);
		
		var one_day=1000*60*60*24;

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
			return months + monthText + " left on the lease";
		} else if(days > 0) {
			var dayText = " Day";
			if(days > 1) {
				dayText = " Days";
			}
			return days + dayText + + " left on the lease"
		} else if(days == 0) {
			return "Lease expiring tomorrow";
		} else {
			return "Expired";
		}
	}
	
	render() {
		
		if(this.state.property.images !== undefined) {
			var imageDiv = this.state.property.images.map(function(img, index) {
				return (<div key={index}><img src={img} /></div>);
			});
		}

		return  (
			<div className="appliaction-main-body fix-navigation-margin">
				<div className="container">
					<div className="row">
						<div className="col-lg-9 text-center col-asd">
							<Carousel autoPlay={true} infiniteLoop={true} showThumbs={false} >
								{imageDiv}
							</Carousel>
							<div className="row individual-view-image-info-bar-row">
								<div className="col-lg-3 text-left col-asd">
									<h5>{(this.state.property.rent !== undefined) ? "$"+this.state.property.rent+"PW" : ""} </h5>
								</div>
								<div className="col-lg-6 text-center col-asd">
									<h5>{(this.state.property.expiry !== undefined) ? this.calculateMonths() : ""}</h5>
								</div>
								<div className="col-lg-3 text-right col-asd">
								{
									(this.state.property.expiry !== undefined) ? <button className="btn btn-primary" onClick={()=>this.goToLogin()}>Login</button> : "" 
								}
								</div>
							</div>
						</div>
						<div className="col-lg-3 individual-view-contact col-asd">
							<div className="row text-center">
								<div className="col-lg-12 individual-view-contact-info-col">
									<img className="individual-view-contact-info-image" 
										src={require('./img/icons/placeholder.png')} 
										alt="user" 
									/>
									<h5 className="individual-view-contact-info-name" > 
										{(this.state.property.owner !== undefined) ? this.state.property.onwer : "Do Not Know" }
									</h5>
								</div>
								<div className="col-lg-12">
									<button className="btn btn-primary individual-view-contact-button" onClick={()=>this.goToLogin()} > Call Number </button>
								</div>
								<div className="col-lg-12">
									<button className="btn btn-primary individual-view-contact-button" onClick={()=>this.goToLogin()} > Message </button>
								</div>
								<div className="col-lg-12">
									<button className="btn btn-primary individual-view-contact-button" onClick={()=>this.goToLogin()} > Email </button>
								</div>
								<div className="col-lg-12">
									<button className="btn btn-primary individual-view-contact-button" onClick={()=>this.goToLogin()} > Send Message </button>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-3 col-asd">
							<h5 className="individual-view-property-details-text">
								<i className="fa fa-bed individual-view-property-details-icon" />{this.state.property.bedrooms} {(this.state.property.bedrooms > 1) ? "Bedrooms": "Bedroom"}
							</h5>
							<h5 className="individual-view-property-details-text">
								<i className="fa fa-bath individual-view-property-details-icon" />{this.state.property.bathrooms} {(this.state.property.bathrooms > 1) ? "Bathrooms": "Bathroom"}
							</h5>
							<h5 className="individual-view-property-details-text">
								<i className="fa fa-car individual-view-property-details-icon" />{this.state.property.carspaces} {(this.state.property.carspaces > 1) ? "Carports": "Carport"}
							</h5>
						</div>
						<div className="col-lg-3 col-asd">
							<h5 className="individual-view-property-details-text">
								<i className="fa fa-tv individual-view-property-details-icon" />{this.state.property.furnished} {(this.state.property.furnished) ? "Furnished": "Not furnished"}
							</h5>
							<h5 className="individual-view-property-details-text">
								<i className="fa fa-paw individual-view-property-details-icon" />{this.state.property.pet} {(this.state.property.pet) ? "Pet friendly": "Not allow"}
							</h5>
							<h5 className="individual-view-property-details-text">
								<i className="fa fa-fire individual-view-property-details-icon" />{this.state.property.smoking} {(this.state.property.smoking) ? "Smoking permit": "No Smoking"}
							</h5>
						</div>
						<div className="col-lg-3 col-asd">
							<h5 className="individual-view-property-details-text">
								<i className="fa fa-plus individual-view-property-details-icon" />{this.state.property.facilities} {(this.state.property.facilities) ? "Facilities provided": "No extra facilities"}
							</h5>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-9 individual-view-property-details-description">
							<p>{(this.state.property.description !== undefined) ? this.state.property.description : "Sorry, no description found for above property."}</p>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-12">
							<h3 className="individual-view-address"> 
								<i className="fa fa-map-marker individual-view-address-icon" />{(this.state.property.address !== undefined) ? this.state.property.address : "Address Not Available"}, {this.state.query}
							</h3>
						</div>
						<div className="col-lg-12 google-map-col">
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
		);
	}
}
export default IndividualView;