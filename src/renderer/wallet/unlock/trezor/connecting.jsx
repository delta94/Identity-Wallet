import React, { Component } from 'react';
import { Modal, Typography, Button, Grid, CircularProgress } from '@material-ui/core';
import {
	ModalWrap,
	ModalCloseButton,
	ModalHeader,
	ModalBody,
	ModalCloseIcon,
	HourGlassLargeIcon,
	WarningShieldIcon
} from 'selfkey-ui';
import { connect } from 'react-redux';
import HelpStepsSection from './help-steps-section';
import { appOperations, appSelectors } from 'common/app';
import { push } from 'connected-react-router';

class ConnectingToTrezor extends Component {
	async componentDidMount() {
		await this.props.dispatch(appOperations.setHardwareWalletsAction([]));
		await this.props.dispatch(appOperations.loadTrezorWalletsOperation());
	}

	async componentDidUpdate(prevProps) {
		if (prevProps.hasConnected !== this.props.hasConnected) {
			if (this.props.hasConnected) {
				this.props.dispatch(push('/selectAddress'));
				console.log('HEY');
			}
		}
	}

	handleTryAgain = async () => {
		await this.props.dispatch(appOperations.setUnlockWalletErrorAction(''));
		await this.props.dispatch(appOperations.loadTrezorWalletsOperation());
	};

	handleClose = async () => {
		if (this.props.error !== '') {
			this.props.dispatch(appOperations.setUnlockWalletErrorAction(''));
		}
		await this.props.dispatch(push('/unlockWallet/trezor'));
	};

	renderModalBody = () => {
		if (this.props.error !== '') {
			if (this.props.error === 'TREZOR_BRIDGE_NOT_FOUND') {
				return (
					<Grid
						container
						direction="row"
						justify="flex-start"
						alignItems="flex-start"
						spacing={40}
					>
						<Grid item xs={2}>
							<WarningShieldIcon />
						</Grid>
						<Grid item xs={10}>
							<Grid
								container
								direction="column"
								justify="flex-start"
								alignItems="flex-start"
								spacing={40}
							>
								<Grid item>
									<Typography variant="h2">
										Please Install Trezor Bridge
									</Typography>
								</Grid>
								<Grid item>
									<Typography variant="subtitle1">
										Trezor Bridge is required so that the SelfKey Identity
										Wallet can communicate with your device. It is an official
										application released by the Trezor team available to
										download below. Please restart the application after
										installation.
									</Typography>
								</Grid>
								<Grid item>
									<Grid
										container
										direction="row"
										justify="flex-start"
										alignItems="center"
										spacing={16}
									>
										<Grid item>
											<Typography variant="h3">URL:</Typography>
										</Grid>
										<Grid item>
											<Typography variant="subtitle1">
												https://wallet.trezor.io/#/bridge
											</Typography>
										</Grid>
										<Grid item>
											<Button
												variant="outlined"
												size="small"
												color="secondary"
												onClick={e => {
													window.openExternal(
														e,
														'https://wallet.trezor.io/#/bridge'
													);
												}}
											>
												Download
											</Button>
										</Grid>
									</Grid>
								</Grid>
								<Grid item>
									<Grid
										container
										direction="row"
										justify="flex-start"
										alignItems="center"
										spacing={24}
									>
										<Grid item>
											<Button
												variant="contained"
												size="large"
												onClick={this.handleTryAgain}
											>
												TRY AGAIN
											</Button>
										</Grid>
										<Grid item>
											<Button
												variant="outlined"
												size="large"
												onClick={this.handleClose}
											>
												BACK
											</Button>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				);
			} else {
				return (
					<Grid
						container
						direction="row"
						justify="flex-start"
						alignItems="flex-start"
						spacing={40}
					>
						<Grid item xs={2}>
							<WarningShieldIcon />
						</Grid>
						<Grid item xs={10}>
							<Grid
								container
								direction="column"
								justify="flex-start"
								alignItems="flex-start"
								spacing={40}
							>
								<Grid item>
									<Typography variant="h2">
										Error: Can&#39;t Connect To Trezor
									</Typography>
								</Grid>
								<Grid item>
									<Typography variant="subtitle1">
										To ensure a successful connection, please make sure your
										device is plugged in properly via USB. If you need more
										assistance, please contact help@selfkey.org
									</Typography>
								</Grid>
								<Grid item>
									<Grid
										container
										direction="row"
										justify="flex-start"
										alignItems="center"
										spacing={24}
									>
										<Grid item>
											<Button
												variant="contained"
												size="large"
												onClick={this.handleTryAgain}
											>
												TRY AGAIN
											</Button>
										</Grid>
										<Grid item>
											<Button
												variant="outlined"
												size="large"
												onClick={this.handleClose}
											>
												BACK
											</Button>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				);
			}
		} else {
			return (
				<Grid
					container
					direction="row"
					justify="flex-start"
					alignItems="flex-start"
					spacing={40}
				>
					<Grid item xs={2}>
						<HourGlassLargeIcon />
					</Grid>
					<Grid item xs={10}>
						<Grid
							container
							direction="column"
							justify="flex-start"
							alignItems="flex-start"
							spacing={40}
						>
							<Grid item>
								<Typography variant="h2">Connecting To Trezor</Typography>
							</Grid>
							<Grid item>
								<Typography variant="subtitle1">
									To ensure a successful connection, please make sure your device
									is plugged in properly via USB.
								</Typography>
							</Grid>
							<Grid item>
								<HelpStepsSection />
							</Grid>
							<Grid item>
								<Button
									variant="outlined"
									size="large"
									color="secondary"
									onClick={this.handleClose}
								>
									CANCEL
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			);
		}
	};

	render() {
		return (
			<div>
				<Modal open={true}>
					<ModalWrap>
						<ModalCloseButton onClick={this.handleClose}>
							<ModalCloseIcon />
						</ModalCloseButton>
						<ModalHeader>
							<Grid
								container
								direction="row"
								justify="space-between"
								alignItems="center"
							>
								<Grid item>
									<Typography variant="h6">Connecting</Typography>
								</Grid>
								<Grid item>
									<CircularProgress />
								</Grid>
							</Grid>
						</ModalHeader>
						<ModalBody>{this.renderModalBody()}</ModalBody>
					</ModalWrap>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state, props) => {
	const app = appSelectors.selectApp(state);
	console.log(app);
	return {
		error: app.error,
		hasConnected: app.hardwareWallets.length > 0
	};
};

export default connect(mapStateToProps)(ConnectingToTrezor);
