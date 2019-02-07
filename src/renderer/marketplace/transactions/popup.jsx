import * as React from 'react';
import { Modal, Typography } from '@material-ui/core';
import { ModalWrap, ModalCloseButton, ModalCloseIcon, ModalHeader, ModalBody } from 'selfkey-ui';

export const Popup = ({ classes, children, closeAction, text }) => (
	<Modal open={true}>
		<ModalWrap>
			<ModalCloseButton onClick={closeAction}>
				<ModalCloseIcon />
			</ModalCloseButton>
			<ModalHeader>
				<Typography variant="h6" id="modal-title">
					{text}
				</Typography>
			</ModalHeader>

			<ModalBody>{children}</ModalBody>
		</ModalWrap>
	</Modal>
);

export default Popup;