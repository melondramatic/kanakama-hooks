import React, { FormEvent, useContext, useState } from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import PageBase from '../fragments/PageBase';
import { LogIn } from '../utils/axiosCalls';
import { RoutingContext } from '../Routing';
import { LocalStorage, Pages } from '../constants';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import { strings } from '../strings';

const Styles = makeStyles({
	fieldContainer: {
		display: 'flex',
		flexDirection: 'column',
	},
	textField: {
		paddingBottom: '16px',
	},
	heading: {
		fontSize: '20px',
		paddingBottom: '16px',
	},
});

const SignInPage = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errors, setErrors] = useState([]);
	const { setCurrentPage } = useContext(RoutingContext);

	const classes = Styles();

	const handleSubmit = (e: FormEvent) => {
		setIsSubmitting(true);
		LogIn(username, password)
			.then((result) => {
				localStorage.setItem(
					LocalStorage.User,
					JSON.stringify({
						id: result.data.id,
						username: result.data.username,
						accessToken: result.data.accessToken,
					})
				);
				setCurrentPage(Pages.MainPage);
			})
			.catch((error) => {
				setErrors(error.response.data.error);
				setIsSubmitting(false);
			});
		e.preventDefault();
	};

	return (
		<PageBase>
			<div className={classes.heading}>{strings.title}</div>
			<form onSubmit={handleSubmit}>
				<div className={classes.fieldContainer}>
					<TextField
						id={'username'}
						name={'username'}
						label={strings.username}
						required={true}
						value={username}
						variant={'outlined'}
						onChange={(e) => setUsername(e.currentTarget.value)}
						className={classes.textField}
					/>
					<TextField
						type={'password'}
						id={'password'}
						name={'password'}
						label={strings.password}
						required={true}
						value={password}
						variant={'outlined'}
						onChange={(e) => setPassword(e.currentTarget.value)}
						className={classes.textField}
					/>
				</div>
				<Button type={'submit'} variant={'outlined'} disabled={isSubmitting}>
					{strings.button_signIn}
				</Button>
			</form>

			{errors.length > 0 && (
				<ErrorMessage
					errorHeading={`${strings.error_signIn}:`}
					errors={errors}
				/>
			)}
		</PageBase>
	);
};

export default SignInPage;
