import React from 'react';
import { Typography, Grid, List, ListItem } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { PageLoading, sanitize } from '../../common';
import 'flag-icon-css/css/flag-icon.css';
import { primary } from 'selfkey-ui';

const styles = theme => ({
	countryName: {
		textAlign: 'left',
		marginBottom: '2em'
	},
	details: {
		width: '50%',
		marginLeft: '0',
		'& h5': {
			fontWeight: 'normal',
			display: 'inline-block',
			fontSize: '14px'
		},
		'& div': {
			display: 'inline-block'
		},
		'& h5.value': {
			color: '#93B0C1',
			marginLeft: '1em',
			fontWeight: 'bold'
		}
	},
	countryInfo: {
		marginTop: '50px'
	},
	flag: {
		width: '45%',
		'& span': {
			float: 'right'
		}
	},
	tabContainer: {
		width: '100%',
		padding: '2em 0',
		color: '#FFFFFF',
		'& p': {
			marginBottom: '1.5em',
			lineHeight: '1.4em'
		},
		'& strong': {
			fontWeight: 'bold',
			color: theme.palette.secondary.main,
			display: 'block',
			padding: '0',
			marginBottom: '0.5em',
			marginTop: '0em'
		},
		'& ul': {
			listStyle: 'outside',
			lineHeight: '1.4em',
			marginLeft: '0',
			marginBottom: '1.5em'
		},
		'& ul li': {
			lineHeight: '1.4em',
			marginBottom: '0.5em'
		},
		'& a': {
			color: primary
		}
	}
});

const PassportsCountryTab = withStyles(styles)(({ classes, country, program }) => (
	<div className={classes.tabContainer}>
		{!country && <PageLoading />}
		{!!country && (
			<React.Fragment>
				<Typography variant="h1" gutterBottom className={classes.countryName}>
					{country.name}
				</Typography>
				<Grid container justify="flex-start" alignItems="flex-start">
					<div className={classes.details}>
						<List>
							<ListItem>
								<Typography variant="h5" gutterBottom>
									Country Code
								</Typography>
								<Typography variant="h5" gutterBottom className="value">
									{country.code}
								</Typography>
							</ListItem>
							<ListItem>
								<Typography variant="h5" gutterBottom>
									Area
								</Typography>
								<Typography variant="h5" gutterBottom className="value">
									{country.areaInSqKm} km&sup2;
								</Typography>
							</ListItem>
							<ListItem>
								<Typography variant="h5" gutterBottom>
									Capital
								</Typography>
								<Typography variant="h5" gutterBottom className="value">
									{country.capital}
								</Typography>
							</ListItem>
							<ListItem>
								<Typography variant="h5" gutterBottom>
									Continent
								</Typography>
								<Typography variant="h5" gutterBottom className="value">
									{country.continentName}
								</Typography>
							</ListItem>
							<ListItem>
								<Typography variant="h5" gutterBottom>
									Currency
								</Typography>
								<Typography variant="h5" gutterBottom className="value">
									{country.currencyCode}
								</Typography>
							</ListItem>
							<ListItem>
								<Typography variant="h5" gutterBottom>
									Population
								</Typography>
								<Typography variant="h5" gutterBottom className="value">
									{country.population}
								</Typography>
							</ListItem>
						</List>
					</div>
					<div className={classes.flag}>
						<span
							style={{ display: 'block', fontSize: '200px' }}
							className={`flag-icon flag-icon-${country.code.toLowerCase()}`}
						/>
					</div>
				</Grid>
				{program && (
					<div className={classes.countryInfo}>
						<p
							dangerouslySetInnerHTML={{
								__html: sanitize(program.data.description.countryDetails)
							}}
						/>
					</div>
				)}
			</React.Fragment>
		)}
	</div>
));

export { PassportsCountryTab };
export default PassportsCountryTab;
