import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getServiceDetails, hasBalance } from 'common/exchanges/selectors';
import { marketplacesSelectors } from 'common/marketplaces';
import { kycSelectors, kycOperations } from 'common/kyc';
import { Logger } from 'common/logger';
import { push } from 'connected-react-router';

import { MarketplaceServiceDetails } from './service-details';

// eslint-disable-next-line
const log = new Logger('marketplace-item-container');

const mapStateToProps = (state, props) => {
	const name = props.match.params.name;
	let item = getServiceDetails(state, name);
	let serviceId = `${item.serviceOwner}_${item.serviceId}`;
	let templates = [];
	if (item.relying_party_config && item.relying_party_config.templates) {
		templates = item.relying_party_config.templates;
	}
	return {
		item,
		hasBalance: hasBalance(state, name),
		stake: marketplacesSelectors.stakeSelector(state, serviceId),
		pendingTransaction: marketplacesSelectors.pendingTransactionSelector(
			state,
			item.serviceOwner,
			item.serviceId
		),
		relyingPartyName: name,
		templates,
		relyingParty: kycSelectors.relyingPartySelector(state, name),
		relyingPartyIsActive: kycSelectors.relyingPartyIsActiveSelector(state, name),
		relyingPartyShouldUpdate: kycSelectors.relyingPartyShouldUpdateSelector(state, name)
	};
};

class MarketplaceServiceDetailsPageComponent extends Component {
	async componentDidMount() {
		if (this.props.relyingPartyShouldUpdate) {
			await this.props.dispatch(kycOperations.loadRelyingParty(this.props.item.name));
		}
	}

	backAction = () => {
		this.props.dispatch(push('/main/marketplace-exchanges'));
	};

	render() {
		let unlockAction = this.unlockAction;
		let item = this.props.item;
		let { stake } = this.props;
		item = { ...item };
		item.integration = 'Unlock marketplace';
		if (item.status === 'Inactive') {
			item.integration = 'Coming Soon';
			unlockAction = null;
		} else if (this.props.pendingTransaction) {
			item.status = 'pending';
			item.integration = 'Pending KEY deposit';
			if (this.props.pendingTransaction.action === 'withdrawStake') {
				item.integration = 'Pending KEY return';
			}
			unlockAction = null;
		} else if (stake && +stake.balance && +stake.releaseDate) {
			item.status = 'locked';
			item.integration = 'KEY Deposit';
			item.releaseDate = stake.releaseDate;
			unlockAction = null;
		} else if (stake && +stake.balance && !+stake.releaseDay) {
			item.status = 'unlocked';
			item.integration = 'Return KEY Deposit';
			unlockAction = this.returnAction;
		}
		return (
			<div>
				<MarketplaceServiceDetails
					{...this.props}
					item={item}
					unlockAction={unlockAction}
					backAction={this.backAction}
				/>
			</div>
		);
	}
}

export const MarketplaceServiceDetailsPage = connect(mapStateToProps)(
	MarketplaceServiceDetailsPageComponent
);

export default MarketplaceServiceDetailsPage;
