import React from 'react';
import { makeStyles } from '@material-ui/styles';

import Logo from '../components/Logo';
import TitlePageButtons from '../fragments/TitlePageButtons';
import { LocalStorage } from '../constants';

const Styles = makeStyles({
	pageContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	title: {
		fontSize: '30pt',
		margin: '12px',
		letterSpacing: '8px',
		fontWeight: 100,
	},
});

const TitlePage = () => {
	const classes = Styles();
	const user = localStorage.getItem(LocalStorage.User);
	return (
		<div className={classes.pageContainer}>
			<Logo />
			<div className={classes.title}>kanakama</div>
			<TitlePageButtons />
		</div>
	);
};

export default TitlePage;
