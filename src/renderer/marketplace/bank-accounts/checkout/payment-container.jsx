// import React from 'react';
import BN from 'bignumber.js';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { withStyles } from '@material-ui/core/styles';
import { getWallet } from 'common/wallet/selectors';
import { kycSelectors } from 'common/kyc';
import { pricesSelectors } from 'common/prices';
import { bankAccountsOperations, bankAccountsSelectors } from 'common/bank-accounts';
import { ordersOperations } from 'common/marketplaces/orders';
import { MarketplaceBankAccountsComponent } from '../common/marketplace-bank-accounts-component';
// import { PaymentPreapprove } from '../../common/payment-preapprove';

const styles = theme => ({});
const MARKETPLACE_BANK_ACCOUNTS_ROOT_PATH = '/main/marketplace-bank-accounts';
const VENDOR_NAME = 'Far Horizon Capital Inc';
const VENDOR_DID = '0xee10a3335f48e10b444e299cf017d57879109c1e32cec3e31103ceca7718d0ec';

class BankAccountsPaymentContainer extends MarketplaceBankAccountsComponent {
	async componentDidMount() {
		await this.loadRelyingParty({ rp: 'incorporations', authenticated: true });

		if (!this.props.accountType) {
			await this.props.dispatch(bankAccountsOperations.loadBankAccountsOperation());
		}

		await this.createOrder();
	}

	priceInKEY = priceUSD => {
		return new BN(priceUSD).dividedBy(this.props.keyRate).toString();
	};

	async createOrder() {
		const { accountType } = this.props;
		const { accountCode } = this.props.match.params;
		const application = this.getLastApplication();

		this.props.dispatch(
			ordersOperations.startOrderOperation({
				applicationId: application.id,
				amount: this.priceInKEY(parseFloat(accountType.price)),
				vendorId: 'FlagTheory',
				itemId: accountCode,
				vendorDID: VENDOR_DID,
				productInfo: `Bank account in ${accountType.region}`,
				vendorName: VENDOR_NAME,
				backUrl: this.cancelRoute(),
				completeUrl: this.paymentCompleteRoute()
			})
		);
	}

	onBackClick = () => this.props.dispatch(push(this.cancelRoute()));

	onPayClick = () => {
		console.error('TODO: not implemented');
		const { accountCode, countryCode, templateId } = this.props.match.params;

		this.props.dispatch(
			push(
				`${MARKETPLACE_BANK_ACCOUNTS_ROOT_PATH}/select-bank/${accountCode}/${countryCode}/${templateId}`
			)
		);
	};

	render() {
		return null;
		/*
		const { accountType } = this.props;
		console.error('TODO: not implemented gas price for pre-approval');

		return (
			<PaymentPreapprove
				whyLink={'https://help.selfkey.org/'}
				price={accountType.price}
				gas={`Not implemented`}
				onBackClick={this.onBackClick}
				onPayClick={this.onPayClick}
			/>
		);
		*/
	}
}

const mapStateToProps = (state, props) => {
	const { accountCode } = props.match.params;
	const authenticated = true;
	return {
		accountType: bankAccountsSelectors.getTypeByAccountCode(state, accountCode),
		banks: bankAccountsSelectors.getDetailsByAccountCode(state, accountCode),
		publicKey: getWallet(state).publicKey,
		keyRate: pricesSelectors.getRate(state, 'KEY', 'USD'),
		currentApplication: kycSelectors.selectCurrentApplication(state),
		rp: kycSelectors.relyingPartySelector(state, 'incorporations'),
		rpShouldUpdate: kycSelectors.relyingPartyShouldUpdateSelector(
			state,
			'incorporations',
			authenticated
		)
	};
};

const styledComponent = withStyles(styles)(BankAccountsPaymentContainer);
const connectedComponent = connect(mapStateToProps)(styledComponent);
export { connectedComponent as BankAccountsPaymentContainer };
