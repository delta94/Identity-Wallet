import React from 'react';
import { Grid, CardHeader, Card, CardContent, Typography } from '@material-ui/core';
import { CheckMaIcon, AttributeAlertIcon, EditTransparentIcon } from 'selfkey-ui';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
	hr: {
		backgroundColor: '#303C49',
		border: 'none',
		boxSizing: 'border-box',
		height: '1px',
		margin: '5px 16px'
	},
	card: {},
	cardHeader: {
		whiteSpace: 'normal',
		wordBreak: 'break-all'
	},
	regularText: {
		'& span': {
			fontWeight: 400
		}
	},
	attr: {
		margin: '0.5em',
		display: 'block',
		'& .label': {
			display: 'inline-block',
			minWidth: '12em'
		},
		'& h5': {
			display: 'inline-block'
		},
		'& svg': {
			marginRight: '0.5em',
			verticalAlign: 'middle'
		}
	}
});

const renderAttr = attr =>
	attr ? (
		<Typography variant="h5">
			<CheckMaIcon />
			{attr}
		</Typography>
	) : (
		<Typography variant="h5">
			<AttributeAlertIcon />
			Missing
		</Typography>
	);

const editAction = onEdit => (
	<div onClick={onEdit}>
		<EditTransparentIcon />
	</div>
);

const CorporateDetails = withStyles(styles)(props => {
	const { classes, name, jurisdiction, type, date, address, onEdit } = props;
	return (
		<Grid container direction="column" spacing={32}>
			<Grid item>
				<Card>
					<CardHeader
						title={name}
						className={classes.regularText}
						action={editAction(onEdit)}
					/>
					<hr className={classes.hr} />
					<CardContent>
						<Grid
							container
							direction="column"
							justify="center"
							alignItems="flex-start"
							spacing={24}
						>
							<div className={classes.attr}>
								<Typography className="label" color="secondary">
									Jurisdiction
								</Typography>
								{renderAttr(jurisdiction)}
							</div>
							<div className={classes.attr}>
								<Typography className="label" color="secondary">
									Entity Type
								</Typography>
								{renderAttr(type)}
							</div>
							<div className={classes.attr}>
								<Typography className="label" color="secondary">
									Incorporation Date
								</Typography>
								{renderAttr(date)}
							</div>
							<div className={classes.attr}>
								<Typography className="label" color="secondary">
									Address
								</Typography>
								{renderAttr(address)}
							</div>
						</Grid>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
});

export { CorporateDetails };
export default CorporateDetails;
