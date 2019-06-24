import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, IconButton } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import classNames from 'classnames';
import { LargeTableHeadRow, TagTableCell, Tag, KeyTooltip, InfoTooltip } from 'selfkey-ui';
import { ProgramPrice, FlagCountryName } from '../../common';

const styles = theme => ({
	table: {
		'& td': {
			height: 'auto',
			padding: '0 20px'
		},
		'& th': {
			padding: '0 20px'
		}
	},
	tableHeaderRow: {
		'& th': {
			fontFamily: 'Lato, arial, sans-serif',
			fontSize: '15px',
			fontWeight: 'bold',
			color: '#7F8FA4',
			textTransform: 'uppercase',
			border: 'none'
		}
	},
	tableBodyRow: {
		'& span.category': {
			display: 'inline-block',
			margin: '2px 5px',
			padding: '2px 8px',
			color: '#93B0C1',
			background: '#1E262E',
			borderRadius: '10px',
			fontSize: '12px',
			lineHeight: '19px'
		},
		'& span.price-key': {
			color: '#93B0C1',
			fontSize: '12px',
			display: 'block',
			whiteSpace: 'nowrap',
			margin: '2px auto'
		}
	},
	tableRow: {
		'& td': {
			padding: '15px 20px'
		}
	},
	costCell: {
		width: '70px'
	},
	eligibilityCell: {
		maxWidth: '245px',
		width: '245px'
	},
	eligibilityCellBody: {
		alignItems: 'center',
		display: 'flex',
		flexWrap: 'wrap',
		paddingTop: '15px',
		paddingBottom: '15px',
		whiteSpace: 'normal',
		lineHeight: '19px',
		maxWidth: '245px'
	},
	flagCell: {
		width: '10px'
	},
	regionCell: {
		minWidth: '100px',
		lineHeight: '19px',
		whiteSpace: 'normal',
		padding: '0 20px'
	},
	detailsCell: {
		width: '55px',
		color: '#00C0D9',
		'& span': {
			cursor: 'pointer'
		}
	},
	goodForCell: {
		width: '250px',
		padding: '20px',
		whiteSpace: 'normal'
	},
	minDepositCell: {
		width: '85px'
	},
	personalVisitCell: {
		minWidth: '120px'
	},
	personalVisitText: {
		alignItems: 'center',
		display: 'flex',
		'& svg': {
			height: '15px !important',
			width: '15px !important'
		}
	}
});

const BankingOffersTable = withStyles(styles)(
	({ classes, keyRate, data = [], onDetails, className }) => {
		return (
			<Table className={classNames(classes.table, className)}>
				<TableHead>
					<LargeTableHeadRow>
						<TableCell className={classes.flagCell} />
						<TableCell className={classes.regionCell}>
							<Typography variant="overline">Region</Typography>
						</TableCell>
						<TableCell className={classes.eligibilityCell}>
							<Typography variant="overline">Eligibility</Typography>
						</TableCell>
						<TableCell className={classes.minDepositCell}>
							<Typography variant="overline">Min. Deposit</Typography>
						</TableCell>
						<TableCell className={classes.goodForCell}>
							<Typography variant="overline">Good for</Typography>
						</TableCell>
						<TableCell className={classes.personalVisitCell}>
							<Typography variant="overline" className={classes.personalVisitText}>
								Personal Visit
								<KeyTooltip
									interactive
									placement="top-start"
									className={classes.tooltip}
									title={
										<React.Fragment>
											<span>
												Personal visit is shown as required if all the banks
												from that region request it.{' '}
											</span>
										</React.Fragment>
									}
								>
									<IconButton aria-label="Info">
										<InfoTooltip />
									</IconButton>
								</KeyTooltip>
							</Typography>
						</TableCell>
						<TableCell className={classes.costCell}>
							<Typography variant="overline">Cost</Typography>
						</TableCell>
						<TableCell className={classes.detailsCell} />
					</LargeTableHeadRow>
				</TableHead>
				<TableBody className={classes.tableBodyRow}>
					{data.map(bank => (
						<TableRow key={bank.id} className={classes.tableRow}>
							<TableCell className={classes.flagCell}>
								<FlagCountryName code={bank.countryCode} size="small" />
							</TableCell>
							<TableCell className={classes.regionCell}>
								<Typography variant="h6">{bank.region}</Typography>
							</TableCell>
							<TableCell>
								<div className={classes.eligibilityCellBody}>
									{bank.eligibility &&
										bank.eligibility.map((tag, index) => (
											<Typography variant="h6" key={tag}>
												{tag}
												{index !== bank.eligibility.length - 1 ? ',' : ''}
											</Typography>
										))}
								</div>
							</TableCell>
							<TableCell className={classes.minDepositCell}>
								<Typography variant="h6">{bank.minDeposit}</Typography>
							</TableCell>
							<TagTableCell className={classes.goodForCell}>
								{bank.goodFor &&
									bank.goodFor.map(tag => <Tag key={tag}>{tag}</Tag>)}
							</TagTableCell>
							<TableCell className={classes.personalVisitCell}>
								{bank.personalVisitRequired ? (
									<Typography variant="h6">Required</Typography>
								) : (
									<Typography variant="h6">Remote</Typography>
								)}
							</TableCell>
							<TableCell className={classes.costCell}>
								<ProgramPrice label="$" price={bank.price} rate={keyRate} />
							</TableCell>
							<TableCell className={classes.detailsCell}>
								<span onClick={() => onDetails(bank)}>Details</span>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		);
	}
);

export default BankingOffersTable;
export { BankingOffersTable };