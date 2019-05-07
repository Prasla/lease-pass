import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


//Custom Components
import NavigationBar from './UIComponents/NavigationBar';
import FooterBar from './UIComponents/FooterBar';
import Home from './Home';
import SearchResult from './SearchResult';
import IndividualView from './IndividualView';
import PrivacyPolicy from './PrivacyPolicy';
import TermsConditions from './TermsConditions';
import NoMatch from './NoMatch';


class App extends Component {
	
	constructor(props) {
		super();
		this.state = {
			subrubs: "",
			properties: [],
			selection:{}
		}
	}
	
	setProperties(homeState) {
		this.setState({ 
			subrubs: homeState.query,
			properties: homeState.availableProperties
		});
	}
	
	getList() {
		return this.state.properties;
	}
	
	getQuery() {
		return this.state.subrubs;
	}
	
	setSelection(val) {
		this.setState({ 
			selection: val
		});
	}
	
	getSelection() {
		return this.state.selection;
	}


	render() {
		return (
			<Router>
				<div className="application">
					<NavigationBar> </NavigationBar>
					<Switch>
						<Route  
							exact 
							path="/" 
							render = {
								(history, props) => ( 
									<Home 
										route={history} 
										setProperties={this.setProperties.bind(this)} 
									/> 
								)
							}
						/>
						<Route
							exact
							path="/SearchResult" 
							render = {
								(history, props) => ( 
									<SearchResult 
										route={history} 
										getList={this.getList.bind(this)} 
										getQuery={this.getQuery.bind(this)}
										setSelection={this.setSelection.bind(this)}
										/> 
								)
							}
						/>
						<Route
							path="/IndividualView" 
							render = {
								(history, props) => ( 
									<IndividualView 
										route={history}
										getQuery={this.getQuery.bind(this)}
										getSelection={this.getSelection.bind(this)}
										/> 
								)
							}
						/>
						<Route
							exact
							path="/PrivacyPolicy" 
							component = {PrivacyPolicy}
						/>
						<Route
							exact
							path="/TermsConditions" 
							component = {TermsConditions}
						/>
						<Route component={NoMatch} />
					</Switch>
					<FooterBar></FooterBar>
					<div id="toaster" >Error in API service call</div>
				</div>
			</ Router>	
		);
	  }

}

export default App;
