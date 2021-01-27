import { makeStyles } from '@material-ui/styles';
import React from 'react';

interface Props {
	errorHeading: string;
	errors: string[];
}

const Styles = makeStyles({
	errorContainer: {
		display: 'flex',
		flexDirection: 'column',
		paddingTop: '8px',
		width: '30%',
	},
	errorHeading: {
		fontSize: '18px',
	},
	errorItem: {
		color: '#ff6666',
	},
});

const ErrorMessage = (props: Props) => {
	const classes = Styles();
	const errors = props.errors.map((error, index) => {
		return (
			<li key={index} className={classes.errorItem}>
				{error}
			</li>
		);
	});

	return (
		<div className={classes.errorContainer}>
			<div className={classes.errorHeading}>{props.errorHeading}</div>
			<ul>{errors}</ul>
		</div>
	);
};

export default ErrorMessage;
