import React, { Component } from 'react';

class NoMatch extends Component {
	
	constructor(props) {
		super(props);
	}
	
	render() {
		
		return  (
			<div className="appliaction-main-body fix-navigation-margin">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">							
							<img className="img-center" src={require('./img/icons/404.png')} alt="404 Error" />
							<h1 className="text-center"> Resource not found</h1>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default NoMatch;