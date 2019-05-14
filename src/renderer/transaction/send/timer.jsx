import React, { Component } from 'react';
import { Typography, Button, Grid, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import Popup from '../../common/popup';
import { HourGlassLargeIcon } from 'selfkey-ui';
import { appSelectors } from 'common/app';
import history from 'common/store/history';

const styles = theme => ({});

class HardwareWalletTransactionTimer extends Component {
	handleClose = () => {
		history.getHistory().goBack();
	};

	render() {
		const typeText =
			this.props.walletType.charAt(0).toUpperCase() + this.props.walletType.slice(1);
		return (
			<Popup open={true} closeAction={this.handleClose} text="Transaction Confirmation">
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
								<Typography variant="h2">
									Confirm Authentication on {typeText}
								</Typography>
								<Typography variant="body1">
									You have 30 seconds to confirm this authentication on {typeText}{' '}
									or it will time out and automatically cancel.
								</Typography>
							</Grid>
							<Grid item>
								<Button
									color="secondary"
									variant="outlined"
									onClick={this.handleClose}
								>
									BACK
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Popup>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		walletType: appSelectors.selectWalletType(state)
	};
};

export default connect(mapStateToProps)(withStyles(styles)(HardwareWalletTransactionTimer));