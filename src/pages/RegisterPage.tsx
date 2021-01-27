import React, { FormEvent, useContext, useState } from 'react';
import { Backdrop, CircularProgress, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import PageBase from '../fragments/PageBase';
import { CreateUser, LogIn } from '../utils/axiosCalls';
import { RoutingContext } from '../Routing';
import { LocalStorage, Pages } from '../constants';
import ErrorMessage from '../components/ErrorMessage';
import Button from '../components/Button';
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

const RegisterPage = () => {
	const classes = Styles();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errors, setErrors] = useState([]);
	const { setCurrentPage } = useContext(RoutingContext);

	const handleSubmit = (e: FormEvent) => {
		setIsSubmitting(true);
		setErrors([]);
		CreateUser(username, password, email)
			.then(() => {
				LogIn(username, password).then((result) => {
					localStorage.setItem(
						LocalStorage.User,
						JSON.stringify({
							id: result.data.id,
							username: result.data.username,
							accessToken: result.data.accessToken,
						})
					);
					setCurrentPage(Pages.MainPage);
				});
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
						onChange={(e) => setUsername(e.currentTarget.value)}
						variant={'outlined'}
						className={classes.textField}
						inputProps={{ minLength: 3 }}
						helperText={strings.register_usernameHelper}
					/>
					<TextField
						type={'password'}
						id={'password'}
						name={'password'}
						label={strings.password}
						required={true}
						value={password}
						onChange={(e) => setPassword(e.currentTarget.value)}
						variant={'outlined'}
						className={classes.textField}
						inputProps={{ minLength: 6 }}
						helperText={strings.register_passwordHelper}
					/>
					<TextField
						type={'email'}
						id={'email'}
						name={'email'}
						label={strings.email}
						value={email}
						onChange={(e) => setEmail(e.currentTarget.value)}
						variant={'outlined'}
						className={classes.textField}
						helperText={strings.register_emailHelper}
					/>
				</div>
				<Button variant={'outlined'} type={'submit'} disabled={isSubmitting}>
					{strings.button_register}
				</Button>
			</form>

			{errors.length > 0 && (
				<ErrorMessage
					errorHeading={`${strings.error_register}:`}
					errors={errors}
				/>
			)}

			<Backdrop open={isSubmitting}>
				<CircularProgress />
			</Backdrop>
		</PageBase>
	);
};

export default RegisterPage;
