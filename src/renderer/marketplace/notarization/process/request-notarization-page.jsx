import React from 'react';
import { withStyles } from '@material-ui/styles';
import { Button, Typography, Divider } from '@material-ui/core';
import { baseDark, grey, CloseButtonIcon } from 'selfkey-ui';
import { RequestDocumentsList } from './request-documents-list-container';
import { NotariesServiceCost } from '../common/notaries-service-cost';
import { ApplicationStatusBar } from '../../../kyc/application/application-status';

const styles = theme => ({
	container: {
		margin: '0 auto',
		maxWidth: '960px',
		position: 'relative',
		width: '100%'
	},
	containerHeader: {
		alignItems: 'flex-start',
		background: '#2A3540',
		display: 'flex',
		justifyContent: 'flex-start',
		padding: theme.spacing(3, 4),
		'& div': {
			display: 'inline-block',
			color: '#FFF'
		}
	},
	closeIcon: {
		position: 'absolute',
		right: '-20px',
		top: '-20px'
	},
	contentContainer: {
		border: '1px solid #303C49',
		borderRadius: '4px',
		padding: theme.spacing(4)
	},
	howItWorks: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	howItWorksBox: {
		background: '#313D49',
		borderRadius: '4px',
		boxSizing: 'border-box',
		color: '#FFF',
		height: '178px',
		margin: theme.spacing(0, 0, 4, 0),
		minHeight: '178px',
		padding: '2em 3%',
		width: '32%',
		'& header': {
			display: 'flex'
		},
		'& header h4': {
			display: 'inline-block',
			fontSize: '16px',
			fontWeight: 500,
			marginBottom: theme.spacing(2),
			marginLeft: theme.spacing(1),
			marginTop: '-3px'
		},
		'& header span': {
			color: '#00C0D9',
			fontSize: '20px',
			fontWeight: 'bold'
		}
	},
	divider: {
		height: '2px',
		marginBottom: theme.spacing(3)
	},
	textArea: {
		backgroundColor: baseDark,
		boxSizing: 'border-box',
		border: '1px solid #384656',
		borderRadius: '4px',
		color: grey,
		fontFamily: 'Lato,arial,sans-serif',
		fontSize: '14px',
		lineHeight: '21px',
		marginBottom: theme.spacing(5),
		outline: 'none',
		padding: theme.spacing(1, 2),
		width: '100%',
		'&::placeholder': {
			color: grey
		}
	},
	requestBtn: {
		marginRight: theme.spacing(3)
	},
	barStyle: {
		marginBottom: theme.spacing(3),
		padding: theme.spacing(0)
	},
	subheaderBottom: {
		marginBottom: theme.spacing(2)
	},
	overlineBottom: {
		marginBottom: theme.spacing(1)
	}
});

export const RequestNotarizationPage = withStyles(styles)(props => {
	const { documents, selectedDocuments, product, keyRate, gasEthFee, gasUsdFee, loading } = props;
	const {
		classes,
		onBackClick,
		handleAddDocument,
		onStartClick,
		handleSelectDocument,
		handleMessage,
		message = '',
		applicationStatus,
		onStatusAction,
		...passedProps
	} = props;
	const price = product && product.price ? product.price : 0;
	return (
		<div className={classes.container}>
			<CloseButtonIcon onClick={onBackClick} className={classes.closeIcon} />
			<div className={classes.containerHeader}>
				<Typography variant="h2" className="region">
					Notarization Service
				</Typography>
			</div>
			<div className={classes.contentContainer}>
				<ApplicationStatusBar
					status={applicationStatus}
					statusAction={onStatusAction}
					loading={loading}
					barStyle={classes.barStyle}
				/>
				<Typography variant="h2" className={classes.subheaderBottom}>
					How the process works
				</Typography>
				<div className={classes.howItWorks}>
					<div className={classes.howItWorksBox}>
						<header className={classes.header}>
							<span>1</span>
							<Typography variant="h4">
								Provide documents you want notarized
							</Typography>
						</header>
						<div>
							<Typography variant="subtitle2" color="secondary">
								You will be required to provide standard information about yourself,
								and the documents you wished notarized.
							</Typography>
						</div>
					</div>
					<div className={classes.howItWorksBox}>
						<header className={classes.header}>
							<span>2</span>
							<Typography variant="h4">Video Call</Typography>
						</header>
						<div>
							<Typography variant="subtitle2" color="secondary">
								You will be connected live with a notary, so they can confirm your
								identity face-to-face on a webcam. Please make sure your device has
								a camera.
							</Typography>
						</div>
					</div>
					<div className={classes.howItWorksBox}>
						<header className={classes.header}>
							<span>3</span>
							<Typography variant="h4">Receive the notarized documents</Typography>
						</header>
						<div>
							<Typography variant="subtitle2" color="secondary">
								Once the notarization process is done you will receive all the
								documents notarized in your Selfkey wallet.
							</Typography>
						</div>
					</div>
				</div>
				<Divider className={classes.divider} />
				<div>
					<Typography variant="h2" className={classes.subheaderBottom}>
						Select the documents you want notarized
					</Typography>
					<RequestDocumentsList
						documents={documents}
						onAddDocument={handleAddDocument}
						onSelectDocument={handleSelectDocument}
						{...passedProps}
					/>
				</div>
				<div>
					<Typography variant="overline" className={classes.overlineBottom}>
						Message for Notary*
					</Typography>
					<textarea
						className={classes.textArea}
						rows="5"
						onChange={handleMessage}
						value={message}
						required={true}
						placeholder="Please describe the work that needs to be done…."
					/>
				</div>
				<Divider className={classes.divider} />
				<NotariesServiceCost
					selectedDocuments={selectedDocuments}
					price={price}
					keyRate={keyRate}
					gasEthFee={selectedDocuments.length !== 0 ? gasEthFee : 0}
					gasUsdFee={selectedDocuments.length !== 0 ? gasUsdFee : 0}
				/>
				<div>
					<Button
						className={classes.requestBtn}
						variant="contained"
						size="large"
						onClick={onStartClick}
						disabled={!selectedDocuments.length || !message}
					>
						Request Notarization
					</Button>
					<Button variant="outlined" size="large" onClick={onBackClick}>
						Cancel
					</Button>
				</div>
			</div>
		</div>
	);
});

export default RequestNotarizationPage;
