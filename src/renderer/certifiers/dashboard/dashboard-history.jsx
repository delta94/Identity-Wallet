import React, { Component } from 'react';
import moment from 'moment';
import {
	withStyles,
	Typography,
	Grid,
	Paper,
	Divider,
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableRow,
	TablePagination
} from '@material-ui/core';
import { SmallTableHeadRow, ViewIcon, RefreshIcon } from 'selfkey-ui';

const styles = theme => ({
	newRequests: {
		backgroundColor: '#262F39',
		boxShadow: 'none',
		padding: '25px 15px',
		'& h2': {
			fontSize: '20px'
		}
	},
	divider: {
		margin: '20px 0'
	},
	icon: {
		cursor: 'pointer'
	},
	capitalized: {
		textTransform: 'capitalize'
	},
	did: {
		maxWidth: '180px',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap'
	},
	notarizationRequests: {
		marginTop: '40px',
		'& .notarizationRequestsBox': {
			padding: '0 20px'
		}
	},
	identityValidation: {
		marginTop: '30px',
		padding: '0 20px'
	}
});

export const RequestsTableRow = withStyles(styles)(({ classes, data }) => {
	return (
		<TableRow key={data.id}>
			<TableCell>
				<Typography variant="subtitle1">
					{moment(data.date).format('DD MMM YYYY')}
				</Typography>
			</TableCell>
			<TableCell>
				<Typography variant="subtitle1">{data.user.name}</Typography>
				<Typography
					className={classes.did}
					variant="subtitle2"
					color="secondary"
					title={data.user.did}
				>
					{data.user.did}
				</Typography>
			</TableCell>
			<TableCell>
				<Typography variant="subtitle1">{data.noOfDocs}</Typography>
			</TableCell>
			<TableCell>
				<Typography variant="subtitle1">$ {data.revenue.usd}</Typography>
				<Typography
					className={classes.did}
					variant="subtitle2"
					color="secondary"
					title={data.revenue.key}
				>
					{data.revenue.key} KEY
				</Typography>
			</TableCell>
			<TableCell>
				<Typography variant="subtitle1" className={classes.capitalized}>
					$ {data.rate}
				</Typography>
			</TableCell>
			<TableCell>
				<ViewIcon className={classes.icon} />
			</TableCell>
		</TableRow>
	);
});

class CertifiersDashboardHistory extends Component {
	renderDate(date) {
		if (!date) return '-';
		return moment(date).format('DD MMM YYYY');
	}

	render() {
		const { classes, documents } = this.props;
		return (
			<Grid
				container
				direction="column"
				justify="flex-start"
				alignItems="stretch"
				spacing={40}
				className={classes.notarizationRequests}
			>
				<Grid item xs={12} className="notarizationRequestsBox">
					<Paper className={classes.newRequests}>
						<Grid container>
							<Grid container justify="space-between">
								<Typography variant="h2">Notarization Requests</Typography>
								<RefreshIcon className={classes.icon} />
							</Grid>
							<Grid item xs={12}>
								<Divider className={classes.divider} />
							</Grid>
							<Grid item xs={12}>
								<Table>
									<TableHead>
										<SmallTableHeadRow>
											<TableCell>
												<Typography variant="overline">Date</Typography>
											</TableCell>
											<TableCell>
												<Typography variant="overline">User</Typography>
											</TableCell>
											<TableCell>
												<Typography variant="overline">
													No. of documents
												</Typography>
											</TableCell>
											<TableCell>
												<Typography variant="overline">Revenue</Typography>
											</TableCell>
											<TableCell>
												<Typography variant="overline">
													KEY/USD EX Rate
												</Typography>
											</TableCell>
											<TableCell>
												<Typography variant="overline">Actions</Typography>
											</TableCell>
										</SmallTableHeadRow>
									</TableHead>
									<TableBody>
										{documents &&
											documents.map(entry => {
												return <RequestsTableRow data={entry} />;
											})}
									</TableBody>
								</Table>
								<TablePagination
									rowsPerPageOptions={[5, 10, 25]}
									component="div"
									count={documents.length}
									rowsPerPage={5}
									page={1}
									backIconButtonProps={{
										'aria-label': 'previous page'
									}}
									nextIconButtonProps={{
										'aria-label': 'next page'
									}}
								/>
							</Grid>
						</Grid>
					</Paper>
				</Grid>

				<Grid item xs={12} className={classes.identityValidation}>
					<Paper className={classes.newRequests}>
						<Grid container>
							<Grid container justify="space-between">
								<Typography variant="h2">Identity Validation Requests</Typography>
								<RefreshIcon className={classes.icon} />
							</Grid>
							<Grid item xs={12}>
								<Divider className={classes.divider} />
							</Grid>
							<Grid item xs={12}>
								<Table>
									<TableHead>
										<SmallTableHeadRow>
											<TableCell>
												<Typography variant="overline">Date</Typography>
											</TableCell>
											<TableCell>
												<Typography variant="overline">User</Typography>
											</TableCell>
											<TableCell>
												<Typography variant="overline">
													No. of documents
												</Typography>
											</TableCell>
											<TableCell>
												<Typography variant="overline">Revenue</Typography>
											</TableCell>
											<TableCell>
												<Typography variant="overline">
													KEY/USD EX Rate
												</Typography>
											</TableCell>
											<TableCell>
												<Typography variant="overline">Actions</Typography>
											</TableCell>
										</SmallTableHeadRow>
									</TableHead>
									<TableBody>
										{documents &&
											documents.map(entry => {
												return <RequestsTableRow data={entry} />;
											})}
									</TableBody>
								</Table>
								<TablePagination
									rowsPerPageOptions={[5, 10, 25]}
									component="div"
									count={documents.length}
									rowsPerPage={5}
									page={1}
									backIconButtonProps={{
										'aria-label': 'previous page'
									}}
									nextIconButtonProps={{
										'aria-label': 'next page'
									}}
								/>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			</Grid>
		);
	}
}

export const CertifiersDashboardHistoryTab = withStyles(styles)(CertifiersDashboardHistory);

export default CertifiersDashboardHistoryTab;
