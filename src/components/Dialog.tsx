import React from 'react';
import MaterialDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from './Button';

interface Props {
	isOpen: boolean;
	contentText: string;
	leftButtonText: string;
	rightButtonText: string;
	leftButtonAction: Function;
	rightButtonAction: Function;
}

const Dialog = ({
	isOpen,
	contentText,
	leftButtonText,
	rightButtonText,
	leftButtonAction,
	rightButtonAction,
}: Props) => {
	return (
		<MaterialDialog open={isOpen}>
			<DialogContent>
				<DialogContentText>{contentText}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button id={'left-dialog-button'} onClick={leftButtonAction}>
					{leftButtonText}
				</Button>
				<Button id={'right-dialog-button'} onClick={rightButtonAction}>
					{rightButtonText}
				</Button>
			</DialogActions>
		</MaterialDialog>
	);
};

export default Dialog;
