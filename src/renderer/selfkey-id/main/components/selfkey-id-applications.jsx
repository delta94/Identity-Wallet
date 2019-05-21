import React, { Component } from 'react';
import config from 'common/config';
import {
	Button,
	Card,
	CardContent,
	Typography,
	ExpansionPanel,
	ExpansionPanelSummary,
	Grid,
	Divider,
	ExpansionPanelDetails,
	List,
	ListItem,
	createStyles,
	withStyles
} from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import {
	KeyTooltip,
	TooltipArrow,
	CheckMaIcon,
	DeniedIcon,
	HourGlassIcon,
	SimpleCheckIcon,
	SimpleDeniedIcon,
	SimpleHourglassIcon,
	AttributeAlertLargeIcon,
	NewRefreshIcon,
	MarketplaceIcon,
	success,
	warning,
	typography,
	error
} from 'selfkey-ui';
import moment from 'moment';
import classNames from 'classnames';
import { push } from 'connected-react-router';

const styles = theme => ({
	statusIcon: {
		width: '36px !important',
		height: '36px !important'
	},
	type: {
		paddingRight: '10px'
	},
	label: {
		minWidth: '130px',
		paddingRight: '20px'
	},
	statusInfoWrap: {
		padding: '30px 24px'
	},
	statusInfo: {
		width: '100%'
	},
	headerIcon: {
		marginRight: '13px'
	},
	list: {
		paddingLeft: 0,
		paddingRight: 0
	},
	listItem: {
		alignItems: 'baseline',
		padding: 0
	},
	noRightPadding: {
		paddingRight: '0 !important'
	},
	title: {
		padding: '16px'
	},
	next: {
		minWidth: '120px'
	}
});

const statusInfoStyle = theme =>
	createStyles({
		defaultStatus: {
			border: `1px solid ${success}`,
			borderRadius: '4px',
			boxSizing: 'border-box',
			padding: '25px 30px'
		},
		grow: {
			flexGrow: 1
		},
		statusIcon: {
			marginRight: '25px'
		},
		iconContainer: {
			marginRight: '25px',
			textAlign: 'center',
			width: '38px'
		},
		attribute: {
			height: '45px',
			width: '38px'
		},
		statusWrap: {
			width: '100%',
			'& .required': {
				border: `1px solid ${warning}`
			},
			'& .submitted': {
				border: `1px solid ${typography}`
			},
			'& .denied': {
				border: `1px solid ${error}`
			}
		},
		refresh: {
			cursor: 'pointer',
			marginLeft: '30px'
		}
	});

const StatusInfo = withStyles(statusInfoStyle)(
	({ classes, status, onClick, handleRefresh, tooltip, loading }) => {
		let icon;
		let message;
		let statusStyle;
		let button = null;
		switch (status) {
			case 2:
				icon = <SimpleCheckIcon className={classes.statusIcon} />;
				message =
					'Application completed. Please check your email to receive relevant documents and information.';
				break;
			case 3:
			case 7:
			case 8:
				icon = <SimpleDeniedIcon className={classes.statusIcon} />;
				message = 'Application denied. Please check your email for the reject reason.';
				statusStyle = 'denied';
				break;
			case 9:
				icon = <AttributeAlertLargeIcon className={classes.statusIcon} />;
				message = 'Application started. Missing required documents.';
				button = (
					<Button variant="contained" size="large" onClick={onClick} disabled={loading}>
						{loading ? 'Loading' : 'Add Documents'}
					</Button>
				);
				statusStyle = 'required';
				break;
			default:
				icon = <SimpleHourglassIcon className={classes.statusIcon} />;
				message =
					'Application started. Documents submitted. Please check your email for further instructions.';
				statusStyle = 'submitted';
				break;
		}

		return (
			<div className={classes.statusWrap}>
				<Grid item className={classNames(classes.defaultStatus, status, statusStyle)}>
					<Grid
						container
						direction="row"
						justify="space-between"
						alignItems="center"
						wrap="nowrap"
					>
						<Grid item className={classes.iconContainer}>
							{icon}
						</Grid>
						<Grid item className={classes.grow}>
							<Typography variant="h2">Status</Typography>
							<Typography variant="subtitle2" color="secondary">
								{message}
							</Typography>
						</Grid>
						<Grid item>{button || <span />}</Grid>
						<Grid item style={{ height: '23px' }}>
							<KeyTooltip
								interactive
								placement="top-start"
								title={
									<React.Fragment>
										<span>{tooltip}</span>
										<TooltipArrow />
									</React.Fragment>
								}
							>
								<span
									className={classes.refresh}
									onClick={handleRefresh}
									disabled={loading}
								>
									<NewRefreshIcon />
								</span>
							</KeyTooltip>
						</Grid>
					</Grid>
				</Grid>
			</div>
		);
	}
);

const HeaderIcon = withStyles(styles)(({ status, classes }) => {
	let icon = null;
	/* Check KYC Status here: https://confluence.kyc-chain.com/display/DEV/KYC+Process+Statuses
	 *	 1 In progress: HourGlassIcon
	 *	 2 Approved: CheckMaIcon
	 *	 3 Rejected: DeniedIcon
	 *	 4 Uploaded: HourGlassIcon
	 *	 5 Invited: HourGlassIcon
	 *	 6 User processing: HourGlassIcon
	 *	 7 User declined: DeniedIcon
	 *	 8 Cancelled: DeniedIcon
	 *	 9 Additional requested: HourGlassIcon
	 *	10 Corporate details: HourGlassIcon
	 *	11 User processing requirement: HourGlassIcon
	 *	12 Partially approved: HourGlassIcon
	 *	13 Send tokens: HourGlassIcon
	 *	14 Manager assigned: HourGlassIcon
	 */
	switch (status) {
		case 2:
			icon = <CheckMaIcon className={classes.headerIcon} />;
			break;
		case 3:
		case 7:
		case 8:
			icon = <DeniedIcon className={classes.headerIcon} />;
			break;
		default:
			icon = <HourGlassIcon />;
	}
	return icon;
});

const getRpInfo = (rpName, field) => {
	return config.relyingPartyInfo[rpName][field];
};

const MARKETPLACE_ROOT_PATH = '/main/marketplace-categories';

class SelfkeyIdApplicationsComponent extends Component {
	handleAccessClick = _ => this.props.dispatch(push(MARKETPLACE_ROOT_PATH));
	render() {
		const { classes, loading } = this.props;

		if (this.props.applications && this.props.applications.length === 0) {
			return (
				<Grid container direction="row" justify="flex-start" alignItems="flex-start">
					<Grid item xs={2}>
						<MarketplaceIcon />
					</Grid>
					<Grid item xs={10}>
						<Typography variant="body1" gutterBottom>
							Your {`haven't`} applied for any service in the Marketplace
						</Typography>
						<br />
						<Typography variant="overline" gutterBottom>
							Once you apply to a service in the marketplace, you will be able to{' '}
							manage it from this area.
						</Typography>
						<br />
						<br />
						<Button
							id="marketplace"
							variant="contained"
							onClick={this.handleAccessClick}
							className={classes.next}
							size="large"
						>
							Access Marketplace
						</Button>
					</Grid>
				</Grid>
			);
		}

		return (
			<React.Fragment>
				{this.props.applications.map((item, index) => (
					<React.Fragment key={item.id}>
						<ExpansionPanel defaultExpanded={index === 0}>
							<ExpansionPanelSummary expandIcon={<ExpandLessIcon />}>
								<Grid
									container
									direction="row"
									justify="flex-start"
									alignItems="baseline"
								>
									<Typography variant="h2" className={classes.type}>
										{item.rpName.charAt(0).toUpperCase() + item.rpName.slice(1)}
									</Typography>
									<Typography variant="subtitle2" color="secondary">
										- {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
									</Typography>
								</Grid>
								<Grid
									container
									direction="row"
									justify="flex-end"
									alignItems="center"
									className={classes.noRightPadding}
								>
									<HeaderIcon status={item.currentStatus} />
									<Typography variant="subtitle2" color="secondary">
										{item.currentStatusName}
									</Typography>
								</Grid>
							</ExpansionPanelSummary>
							<Divider />
							<Grid
								className={classes.statusInfoWrap}
								container
								direction="row"
								alignItems="center"
							>
								<StatusInfo
									status={item.currentStatus}
									onClick={() =>
										this.props.handleAddDocuments(item.id, item.rpName)
									}
									handleRefresh={() => this.props.handleRefresh(item.id)}
									tooltip={moment(new Date(item.updatedAt)).format('DD MMM YYYY')}
									loading={loading}
								/>
							</Grid>
							<ExpansionPanelDetails>
								<Grid container spacing={32}>
									<Grid item xs>
										<Card>
											<Typography variant="h2" className={classes.title}>
												Application Details
											</Typography>
											<Divider variant="middle" />
											<CardContent>
												<List className={classes.list}>
													<ListItem
														key="applicationDate"
														className={classes.listItem}
													>
														<Typography
															variant="body2"
															color="secondary"
															className={classes.label}
														>
															Application Date
														</Typography>
														<Typography variant="body2">
															{moment(item.applicationDate).format(
																'DD MMM YYYY'
															)}
														</Typography>
													</ListItem>
													<ListItem
														key="serviceProvider"
														className={classes.listItem}
													>
														<Typography
															variant="body2"
															color="secondary"
															className={classes.label}
														>
															Service Provider
														</Typography>
														<Typography variant="body2">
															{getRpInfo(item.rpName, 'name')}
														</Typography>
													</ListItem>
													<ListItem
														key="providerContact"
														className={classes.listItem}
													>
														<Typography
															variant="body2"
															color="secondary"
															className={classes.label}
														>
															Provider Contact
														</Typography>
														<Typography variant="body2">
															{getRpInfo(item.rpName, 'email')}
														</Typography>
													</ListItem>
													<ListItem
														key="address"
														className={classes.listItem}
													>
														<Typography
															variant="body2"
															color="secondary"
															className={classes.label}
														>
															Address
														</Typography>
														<Typography variant="body2">
															{getRpInfo(item.rpName, 'address')}
														</Typography>
													</ListItem>
												</List>
											</CardContent>
										</Card>
									</Grid>
									<Grid item xs>
										<Card>
											<Typography variant="h2" className={classes.title}>
												Payment Details
											</Typography>
											<Divider variant="middle" />
											<CardContent>
												<List className={classes.list}>
													<ListItem
														key="transactionId"
														className={classes.listItem}
													>
														<Typography
															variant="body2"
															color="secondary"
															className={classes.label}
														>
															Transaction ID
														</Typography>
														<Typography variant="body2">
															{item.payments &&
																item.payments.transactionHash}
														</Typography>
													</ListItem>
													<ListItem
														key="transactionDate"
														className={classes.listItem}
													>
														<Typography
															variant="body2"
															color="secondary"
															className={classes.label}
														>
															Transaction Date
														</Typography>
														<Typography variant="body2">
															{item.payments &&
																moment(
																	item.payments.transactionDate
																).format('DD MMM YYYY')}
														</Typography>
													</ListItem>
													<ListItem
														key="amount"
														className={classes.listItem}
													>
														<Typography
															variant="body2"
															color="secondary"
															className={classes.label}
														>
															Amount
														</Typography>
														<Typography variant="body2">
															{item.payments &&
																item.payments.amountKey}
														</Typography>
													</ListItem>
													<ListItem
														key="paymentStatus"
														className={classes.listItem}
													>
														<Typography
															variant="body2"
															color="secondary"
															className={classes.label}
														>
															Payment Status
														</Typography>
														<Typography variant="body2">
															{item.payments && item.payments.status}
														</Typography>
													</ListItem>
												</List>
											</CardContent>
										</Card>
									</Grid>
								</Grid>
							</ExpansionPanelDetails>
						</ExpansionPanel>
						<br />
					</React.Fragment>
				))}
			</React.Fragment>
		);
	}
}

export const SelfkeyIdApplications = withStyles(styles)(SelfkeyIdApplicationsComponent);

export default SelfkeyIdApplications;
