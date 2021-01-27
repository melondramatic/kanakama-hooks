import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { strings } from '../../strings';

interface Props {
	title: string;
	occurrences: number;
	correct: number;
}

const Styles = makeStyles({
	statsData: {
		paddingBottom: '8px',
	},
	statsTitle: {
		fontSize: '14pt',
	},
});

const ExerciseStatData = (props: Props) => {
	const classes = Styles();
	const accuracy =
		props.occurrences > 0
			? `${((props.correct / props.occurrences) * 100).toFixed(2)}%`
			: 'N/A';

	return (
		<div className={classes.statsData}>
			<div className={classes.statsTitle}>{props.title}</div>
			<div>{`${strings.stats_timesSeen}: ${props.occurrences}`}</div>
			<div>{`${strings.stats_correctAnswers}: ${props.correct}`}</div>
			<div>{`${strings.stats_accuracy}: ${accuracy}`}</div>
		</div>
	);
};

export default ExerciseStatData;
