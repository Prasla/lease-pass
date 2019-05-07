import React, { Component } from 'react';
class WhoWeAre extends Component {
  render() {
    return  (
		<section id="who-we-are" className="bg-light">
		  <div className="container">
			<div className="row">
			  <div className="col-lg-10 offset-lg-1 text-center">
				<h2 className="section-heading text-uppercase">Who we are</h2>
				<p className="text-muted text-justify mb-4 mt-5">
				  We are three friends, currently based in Melbourne, with heaps of experience in the IT industry.
				</p>
				<p className="text-muted text-justify mb-4">
				  As young professionals, we have more than once been in the situation where changes to our working arrangements took us to different cities and we had to break our rental contracts, paying hefty fines to real estate agents every single time.
				  Well, we could have transferred the lease to someone else, but finding someone else was extremely difficult, and costly.
				</p>
				<p className="text-muted text-justify mb-4">
				  Leasepass was born to fill the gap.
				  It provides a channel for people looking to transfer their lease to connect with potential tenants looking for their next move.
				  For the former, it is opportunity to avoid the hefty fines.
				  For the latter, it is the chance to hit on a hidden market and jump the competition queue.
				</p>
				<p className="text-muted text-justify mb-5">
				  Drop us a line and we'll be happy to meet for a coffee.
				</p>
			  </div>
			</div>
		  </div>
		</section>
	);
  }
}
export default WhoWeAre;