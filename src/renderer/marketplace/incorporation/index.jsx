import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { IncorporationsListContainer } from './list/incorporations-list-container';
import { IncorporationsDetailsContainer } from './details/incorporations-details-container';
import { IncorporationsCheckoutContainer } from './checkout/incorporations-checkout-container';
import { IncorporationsPaymentContainer } from './checkout/incorporations-payment-container';
import { IncorporationsPaymentCompleteContainer } from './checkout/incorporations-payment-complete-container';
import { connect } from 'react-redux';
import { marketplaceOperations } from 'common/marketplace';

class MarketplaceIncorporationComponent extends Component {
	async componentDidMount() {
		await this.props.dispatch(marketplaceOperations.loadMarketplaceOperation());
	}
	render() {
		const { path } = this.props.match;

		return (
			<div>
				<Route exact path={`${path}`} component={IncorporationsListContainer} />
				<Route
					path={`${path}/details/:companyCode/:countryCode/:templateId?`}
					component={IncorporationsDetailsContainer}
				/>
				<Route
					path={`${path}/checkout/:companyCode/:countryCode/:templateId?`}
					component={IncorporationsCheckoutContainer}
				/>
				<Route
					path={`${path}/pay/:companyCode/:countryCode/:templateId?/:confirmation?`}
					component={IncorporationsPaymentContainer}
				/>
				<Route
					path={`${path}/payment-complete/:companyCode/:countryCode/:templateId?`}
					component={IncorporationsPaymentCompleteContainer}
				/>
			</div>
		);
	}
}

const MarketplaceIncorporationPage = connect()(MarketplaceIncorporationComponent);
export { MarketplaceIncorporationPage };
