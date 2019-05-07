import React, { Component } from 'react';
class WhatIsIt extends Component {
  render() {
    return  (
		<section id="what-is-it">
		  <div className="container">
			<div className="row">
			  <div className="col-lg-8 offset-lg-2 text-center">
				<h2 className="section-heading text-uppercase">What is it</h2>
				<p className="text-muted">
				  Leasepass connects people looking to transfer their existing rental lease with potential tenants looking for their next move
				</p>
			  </div>
			</div>
			<div className="embed-responsive embed-responsive-16by9 mt-5">
			  <iframe src="https://player.vimeo.com/video/264834148?title=0&byline=0&portrait=0" width="960" height="540" frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen></iframe>
			</div>
		  </div>
		</section>
	);
  }
}
export default WhatIsIt;