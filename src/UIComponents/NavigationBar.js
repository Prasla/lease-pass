import React, { Component } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
class NavigationBar extends Component {
  render() {
    return  (
	<nav className="navbar navbar-expand-sm navbar-dark fixed-top navbar-custom" id="mainNav">
	  <div className="container">
		<Link className="navbar-brand" to = "/#page-top" > 
			<img alt="Logo" src={require('../img/logo-red.png')} className="white" />
		</Link>
		<button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
		  <i className="fa fa-bars fa-2x"></i>
		</button>

		<div className="collapse navbar-collapse" id="navbarResponsive">
		  <ul className="navbar-nav text-uppercase ml-auto">
			<li className="nav-item">
				<Link className="nav-link js-scroll-trigger" to = "/#what-is-it" > 
					What is it
				</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link js-scroll-trigger" to = "/#who-we-are" > 
					Who we are
				</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link js-scroll-trigger" to = "/#reach-out" > 
					Reach out
				</Link>
			</li>
		  </ul>
		</div>
	  </div>
	</nav>
	);
  }
}
export default NavigationBar;