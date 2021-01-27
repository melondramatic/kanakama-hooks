import React from 'react';
import { makeStyles } from '@material-ui/styles';

interface Props {
	title: string;
	count: number;
	id: string;
}

const Styles = makeStyles({
	container: {
		margin: '8px',
		padding: '0 32px',
	},
	title: {
		fontSize: '20pt',
	},
	count: {
		fontSize: '28pt',
		fontWeight: 'bold',
	},
});

const Counter = (props: Props) => {
	const classes = Styles();
	return (
		<div id={props.id} className={classes.container}>
			<div className={classes.title}>{props.title}</div>
			<div className={classes.count}>{props.count}</div>
		</div>
	);
};

export default Counter;
