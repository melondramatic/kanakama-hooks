import React, { useContext, useState } from 'react';
import Dialog from '../components/Dialog';

import Button from '../components/Button';
import { LocalStorage, Pages } from '../constants';
import { RoutingContext } from '../Routing';
import { strings } from '../strings';
import { makeStyles } from '@material-ui/styles';

const Styles = makeStyles({
	button: {
		width: '80%',
	},
});

const TitlePageButtons = () => {
	const { setCurrentPage } = useContext(RoutingContext);
	const [showAlert, setShowAlert] = useState(false);
	const classes = Styles();

	return (
		<>
			<Button
				id={'practice-button'}
				onClick={() => {
					setCurrentPage(Pages.PracticeSelectionPage);
				}}
				className={classes.button}
			>
				{strings.button_practice}
			</Button>
			<Button
				id={'stats-button'}
				onClick={() => {
					setCurrentPage(Pages.StatsPage);
				}}
				className={classes.button}
			>
				{strings.button_stats}
			</Button>

			{!localStorage.getItem(LocalStorage.User) && (
				<>
					<Button
						id={'login-button'}
						onClick={() => {
							setCurrentPage(Pages.SignInPage);
						}}
						className={classes.button}
					>
						{strings.button_signIn}
					</Button>
					<Button
						id={'register-button'}
						onClick={() => {
							setCurrentPage(Pages.RegisterPage);
						}}
						className={classes.button}
					>
						{strings.button_register}
					</Button>
				</>
			)}

			{localStorage.getItem(LocalStorage.User) && (
				<>
					<Button
						id={'logout-button'}
						onClick={() => {
							setShowAlert(true);
						}}
						className={classes.button}
					>
						{strings.button_signOut}
					</Button>

					<Dialog
						isOpen={showAlert}
						contentText={strings.dialog_signOut}
						leftButtonAction={() => {
							localStorage.removeItem(LocalStorage.User);
							setShowAlert(false);
						}}
						leftButtonText={strings.button_signOut}
						rightButtonAction={() => {
							setShowAlert(false);
						}}
						rightButtonText={strings.button_cancel}
					/>
				</>
			)}
		</>
	);
};

export default TitlePageButtons;
