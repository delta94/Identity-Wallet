import React, { Component } from 'react';
import {
	withStyles,
	List,
	ListItem,
	Drawer,
	ListItemIcon,
	Grid,
	Typography,
	Divider
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
	DashboardMenuIcon,
	MarketplaceMenuIcon,
	SelfkeyIDMenuIcon,
	AddressBookMenuIcon,
	SelfkeyLogo,
	MenuHelpIcon,
	SwitchAccountsIcon,
	PowerIcon
} from 'selfkey-ui';

const styles = theme => ({
	list: {
		justifyContent: 'space-between',
		margin: 0,
		minHeight: '100%',
		overflow: 'auto',
		width: '100%'
	},
	logoSection: {
		marginBottom: '30px',
		marginTop: '-30px'
	},
	logo: {
		width: '30px',
		height: '34px'
	},
	logoText: {
		fontFamily: 'Orbitron, arial, sans-serif',
		fontSize: '16px',
		letterSpacing: '2.77px',
		lineHeight: '22px',
		marginLeft: '13px',
		marginTop: '3px'
	},
	closeSection: {
		width: '100%'
	},
	pointer: {
		cursor: 'pointer'
	},
	link: {
		outline: 'none',
		'&:focus': {
			outline: 'none'
		}
	},
	listItem: {
		cursor: 'pointer',
		display: 'flex',
		marginBottom: '30px',
		paddingLeft: '10px',
		'& p': {
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap'
		},
		'&:hover': {
			color: '#ffffff',
			'& p': {
				color: '#ffffff'
			},
			'& svg': {
				color: '#ffffff',
				stroke: '#ffffff'
			}
		}
	},
	secondaryButtons: {
		alignItems: 'flex-end',
		display: 'flex',
		flexGrow: 2,
		width: 'inherit'
	},
	inheritWidth: {
		width: 'inherit'
	},
	inheritHeight: {
		height: 'inherit'
	},
	textColor: {
		color: '#fff',
		opacity: 0.8,
		'&:hover': {
			opacity: 1
		}
	},
	version: {
		color: '#fff',
		fontSize: '10px',
		opacity: 0.6,
		position: 'absolute',
		right: 0,
		width: 'auto'
	},
	drawer: {
		transition: 'all 3s',
		'& > div:first-of-type': {
			left: 0,
			opacity: '1 !important',
			right: 'auto'
		}
	},
	openedDrawer: {
		'& > div:first-of-type': {
			minWidth: 200,
			transition: 'all 0.2s ease-out'
		},
		'& .sidebarContainer': {
			transition: 'all 0.2s ease-out',
			width: 200
		}
	},
	closedDrawer: {
		'& > div:first-of-type': {
			minWidth: 56,
			transition: 'all 0.2s ease-out'
		},
		'& .sidebarContainer': {
			transition: 'all 0.2s ease-out',
			width: 56
		}
	},
	listItemIcon: {
		marginRight: '22px'
	}
});

const dashboard = props => <Link to="/main/dashboard" {...props} />;
const marketplace = props => <Link to="/main/marketplace-categories" {...props} />;
const selfkeyId = props => <Link to="/main/selfkeyId" {...props} />;
const addressBook = props => <Link to="/main/addressBook" {...props} />;
const switchAccount = props => <Link to="/home" {...props} />;

class Sidebar extends Component {
	state = {
		open: false
	};

	componentDidMount() {
		this.toggleDrawer(this.props.isOpen);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.isOpen !== this.props.isOpen) {
			this.toggleDrawer(this.props.isOpen);
		}
	}

	toggleDrawer = open => {
		this.props.onClose(open);
		this.setState({
			open
		});
	};

	render() {
		const { classes } = this.props;

		const sideList = (
			<Grid
				container
				direction="column"
				justify="flex-start"
				alignItems="flex-start"
				className={`${classes.list} sidebarContainer`}
				spacing={40}
			>
				<Grid item style={{ padding: '20px 0', flexGrow: 0 }}>
					<Grid
						container
						direction="row"
						alignItems="center"
						wrap="nowrap"
						style={{ paddingLeft: '13px' }}
					>
						<Link to="/main/dashboard" className={classes.link}>
							<SelfkeyLogo className={classes.logo} />
						</Link>
						<Typography variant="h1" className={classes.logoText}>
							SELFKEY
						</Typography>
					</Grid>
				</Grid>
				<Divider style={{ width: '100%', backgroundColor: '#475768', flexGrow: 0 }} />
				<Grid item style={{ padding: '50px 0 20px', flexGrow: 1 }}>
					<List style={{ paddingLeft: '10px' }}>
						<ListItem
							className={classes.listItem}
							component={dashboard}
							key="dashboard"
						>
							<ListItemIcon className={classes.listItemIcon}>
								<DashboardMenuIcon width="16px" height="16px" viewBox="0 0 16 16" />
							</ListItemIcon>
							<Typography variant="body2" color="secondary">
								Dashboard
							</Typography>
						</ListItem>
						<ListItem
							id="marketplaceButton"
							className={classes.listItem}
							component={marketplace}
							key="marketplace"
						>
							<ListItemIcon className={classes.listItemIcon}>
								<MarketplaceMenuIcon
									width="15px"
									height="16px"
									viewBox="0 0 15 16"
								/>
							</ListItemIcon>
							<Typography variant="body2" color="secondary">
								Marketplace
							</Typography>
						</ListItem>
						<ListItem
							id="addressBookButton"
							className={classes.listItem}
							component={addressBook}
							key="addressBook"
						>
							<ListItemIcon className={classes.listItemIcon}>
								<AddressBookMenuIcon
									width="15px"
									height="16px"
									viewBox="0 0 15 16"
								/>
							</ListItemIcon>
							<Typography variant="body2" color="secondary">
								Address Book
							</Typography>
						</ListItem>
						<Divider style={{ marginBottom: '30px' }} />
						<ListItem
							id="selfkeyIdButton"
							className={classes.listItem}
							component={selfkeyId}
							key="selfkeyId"
						>
							<ListItemIcon className={classes.listItemIcon}>
								<SelfkeyIDMenuIcon width="14px" height="20px" viewBox="0 0 14 20" />
							</ListItemIcon>
							<Typography variant="body2" color="secondary">
								My Profile
							</Typography>
						</ListItem>
						{/* <ListItem
							id="affiliate"
							className={classes.listItem}
							component={affiliate}
							key="affiliate"
						>
							<ListItemIcon className={classes.listItemIcon}>
								<AffiliateIcon />
							</ListItemIcon>
							<Typography variant="body2" color="secondary">
								Affiliate Program
							</Typography>
						</ListItem> */}
					</List>
				</Grid>
				<Divider />
				<Grid item style={{ padding: '50px 0 20px' }}>
					<List style={{ paddingLeft: '10px' }}>
						<ListItem
							className={classes.listItem}
							onClick={e => {
								window.openExternal(e, 'https://help.selfkey.org/');
							}}
							key="helpAndSupport"
						>
							<ListItemIcon className={classes.listItemIcon}>
								<MenuHelpIcon />
							</ListItemIcon>
							<Typography variant="body2" className={classes.textColor}>
								Help & Support
							</Typography>
						</ListItem>
						<ListItem
							className={classes.listItem}
							component={switchAccount}
							key="switchAccount"
						>
							<ListItemIcon className={classes.listItemIcon}>
								<SwitchAccountsIcon />
							</ListItemIcon>
							<Typography variant="body2" className={classes.textColor}>
								Switch Accounts
							</Typography>
						</ListItem>
						<ListItem className={classes.listItem} key="quit" onClick={window.quit}>
							<ListItemIcon className={classes.listItemIcon}>
								<PowerIcon />
							</ListItemIcon>
							<Typography variant="body2" className={classes.textColor}>
								Quit
							</Typography>
						</ListItem>
						<ListItem key="version">
							<Typography variant="subtitle2" className={classes.version}>
								V {window.appVersion}
							</Typography>
						</ListItem>
					</List>
				</Grid>
			</Grid>
		);

		return (
			<Drawer
				anchor="right"
				open={this.state.open}
				onClose={() => this.toggleDrawer(false)}
				className={`${classes.drawer} ${
					this.state.open ? classes.openedDrawer : classes.closedDrawer
				}`}
				variant="permanent"
			>
				<div
					tabIndex={0}
					role="button"
					onClick={() => this.toggleDrawer(false)}
					onKeyDown={() => this.toggleDrawer(false)}
					className={classes.inheritHeight}
				>
					{sideList}
				</div>
			</Drawer>
		);
	}
}

export default withStyles(styles)(Sidebar);
