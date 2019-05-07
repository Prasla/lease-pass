import React, { Component } from 'react';
class ReachOut extends Component {
  render() {
    return  (
		<section id="reach-out">
		  <div className="container">
			<div className="row">
			  <div className="col-lg-12 text-center">
				<h2 className="section-heading text-uppercase">Reach out</h2>
				<p className="text-muted mb-3">Have any questions, ideas or feedback? Reach out at</p>
				<a className="reach-out-a" href="mailto:team@leasepass.com.au?Subject=Website%20contact" target="_top">team@leasepass.com.au</a>
			  </div>
			</div>
		  </div>
		</section>
	);
  }
}
export default ReachOut;