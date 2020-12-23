import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import BuyKeyWidget from '../src/renderer/dashboard/buy-key-widget';
import BuyKeyModal from '../src/renderer/dashboard/buy-key-popup-modal';
import MoonpayAgreementModal from '../src/renderer/moonpay/moonpay-agreement-modal';
import PhoneVerificationModal from '../src/renderer/moonpay/phone-verification-modal';
import MoonpayAuthModal from '../src/renderer/moonpay/auth-modal';
import AddPaymentMethodModal from '../src/renderer/moonpay/add-payment-method-modal';

storiesOf('Buy Key/Dashboard Widget', module)
	.add('default', () => (
		<div style={{ width: 400 }}>
			<BuyKeyWidget onBuyClick={action('buy key')} />
		</div>
	))
	.add('swap-enabled', () => (
		<div style={{ width: 400 }}>
			<BuyKeyWidget onBuyClick={action('buy key')} onSwapClick={action('swap key')} />
		</div>
	));

const exchanges = [
	{ id: 'binance', name: 'Binance', url: 'https://binance.com' },
	{ id: 'binance2', name: 'Binance2', trade_url: 'https://binance.com' }
];

storiesOf('Buy Key/Buy Key Popup', module)
	.add('default', () => (
		<BuyKeyModal
			address="0xsdasdsadasdasd"
			exchanges={exchanges}
			onCloseClick={action('close')}
		/>
	))
	.add('moonpay enabled', () => (
		<BuyKeyModal
			onMoonpayClick={() => {
				action('moonpay');
			}}
			address="0xsdasdsadasdasd"
			exchanges={exchanges}
			onCloseClick={action('close')}
		/>
	));

storiesOf('Buy Key/Moonpay/Terms', module).add('default', () => (
	<MoonpayAgreementModal onNext={action('agree')} onCancel={action('close')} />
));

storiesOf('Buy Key/MoonPay/Verify Phone', module)
	.add('loading', () => (
		<PhoneVerificationModal
			loading
			code=""
			onContinueClick={action('continue')}
			onCloseClick={action('close')}
			onResendClick={action('resend')}
			onCodeChange={action('code change')}
			phone="+213134115151"
		/>
	))
	.add('default', () => (
		<PhoneVerificationModal
			code=""
			onContinueClick={action('continue')}
			onCloseClick={action('close')}
			onResendClick={action('resend')}
			onCodeChange={action('code change')}
			phone="+213134115151"
		/>
	))
	.add('filled', () => (
		<PhoneVerificationModal
			code="1313132"
			onContinueClick={action('continue')}
			onCloseClick={action('close')}
			onResendClick={action('resend')}
			onCodeChange={action('code change')}
			phone="+213134115151"
		/>
	))
	.add('error', () => (
		<PhoneVerificationModal
			code="1313132"
			error="Code verification failed"
			onContinueClick={action('continue')}
			onCloseClick={action('close')}
			onResendClick={action('resend')}
			onCodeChange={action('code change')}
			phone="+213134115151"
		/>
	));

storiesOf('Buy Key/Moonpay/Auth', module).add('default', () => (
	<MoonpayAuthModal onNext={action('next')} onCancel={action('cancel')} />
));
storiesOf('Buy Key/Moonpay/Add payment method', module)
	.add('loading', () => (
		<AddPaymentMethodModal
			loading
			onContinueClick={action('continue')}
			onCloseClick={action('close')}
			onCardNumberChange={action('cc change')}
			onExpiryDateChange={action('expiry change')}
			onCCVChange={action('ccv change')}
		/>
	))
	.add('default', () => (
		<AddPaymentMethodModal
			onContinueClick={action('continue')}
			onCloseClick={action('close')}
			onCardNumberChange={action('cc change')}
			onExpiryDateChange={action('expiry change')}
			onCCVChange={action('ccv change')}
		/>
	))
	.add('filled', () => (
		<AddPaymentMethodModal
			cardNumber="1234 1234 1234 1234"
			expiryDate="04/2028"
			ccv="123"
			onContinueClick={action('continue')}
			onCloseClick={action('close')}
			onCardNumberChange={action('cc change')}
			onExpiryDateChange={action('expiry change')}
			onCCVChange={action('ccv change')}
		/>
	))
	.add('disabled', () => (
		<AddPaymentMethodModal
			cardNumber="1234 1234 1234 1234"
			expiryDate="04/2028"
			ccv="123"
			disabled
			onContinueClick={action('continue')}
			onCloseClick={action('close')}
			onCardNumberChange={action('cc change')}
			onExpiryDateChange={action('expiry change')}
			onCCVChange={action('ccv change')}
		/>
	))
	.add('error', () => (
		<AddPaymentMethodModal
			error="Invalid expiry date"
			onContinueClick={action('continue')}
			onCloseClick={action('close')}
			onCardNumberChange={action('cc change')}
			onExpiryDateChange={action('expiry change')}
			onCCVChange={action('ccv change')}
		/>
	));
