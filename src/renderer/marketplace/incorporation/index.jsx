import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import IncorporationsTable from './table';
import IncorporationsDetailView from './detail';
import { IncorporationCheckout, IncorporationProcessStarted } from './pay';

class MarketplaceIncorporationComponent extends Component {
	render() {
		const { path } = this.props.match;

		return (
			<div>
				<Route exact path={`${path}`} component={IncorporationsTable} />
				<Route
					path={`${path}/details/:companyCode/:countryCode`}
					component={IncorporationsDetailView}
				/>
				<Route
					path={`${path}/pay/:companyCode/:countryCode`}
					component={IncorporationCheckout}
				/>
				<Route
					path={`${path}/process-started/:companyCode/:countryCode`}
					component={IncorporationProcessStarted}
				/>
			</div>
		);
	}
}

const MarketplaceIncorporationPage = MarketplaceIncorporationComponent;
export { MarketplaceIncorporationPage };
