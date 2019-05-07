import React, { Component } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
class FooterBar extends Component {
	render() {
		return  (
			<footer>
			  <div className="container mb-3 mt-3" >
				<div className="row">
				  <div className="col-md-4">
					<span className="copyright">Copyright &copy; Leasepass 2018</span>
				  </div>
				  <div className="col-md-4">
					<ul className="list-inline social-buttons">
					  <li className="list-inline-item">
						<a href="https://www.facebook.com/leasepass/" target="_blank">
						  <i className="fa fa-facebook"></i>
						</a>
					  </li>
					</ul>
				  </div>
				  <div className="col-md-4">
					<ul className="list-inline quicklinks">
					  <li className="list-inline-item">
						<Link to = "/PrivacyPolicy">Privacy Policy</Link>
					  </li>
					  <li className="list-inline-item">
						<Link to = "/TermsConditions">Terms of Use</Link>
					  </li>
					</ul>
				  </div>
				</div>
			  </div>
			</footer>
		);
	}
}
export default FooterBar;