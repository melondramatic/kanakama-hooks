import React, { useState } from 'react';
import { Icon } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';

import Button from '../../components/Button';
import { KanaType, PracticeMode } from '../../constants';
import data from '../../kana.json';
import createAnswerButton from './utils/createAnswerButton';
import { strings } from '../../strings';

interface Props {
	practiceMode: PracticeMode;
	options: Set<number>;
	correctIndex: number;
	onCorrect: Function;
	onIncorrect: Function;
	kanaSelection: KanaType;
}

const Styles = makeStyles({
	answerButtonsContainer: {
		display: 'flex',
		justifyContent: 'center',
	},
	iconPosition: {
		position: 'absolute',
		top: '23px',
		left: '23px',
		zIndex: 1000,
	},
	answerButtonReading: {
		height: '60px',
		width: '160px',
		background: 'none',
		border: 'solid black 2px',
		margin: '8px',
		fontSize: '16pt',
		fontStyle: 'italic',
		textTransform: 'lowercase',
	},
	answerButtonCharacter: {
		height: '240px',
		width: '240px',
		background: 'none',
		border: 'solid black 2px',
		borderRadius: '4px',
		margin: '8px',
		fontSize: '12pt',
	},
	correctReading: {
		color: 'black !important',
		backgroundColor: '#66ff66',
	},
	incorrectReading: {
		color: 'black !important',
		backgroundColor: '#ff6666',
	},
	correctCharacter: {
		border: '12px solid #66ff66',
	},
	incorrectCharacter: {
		border: '12px solid #ff6666',
	},
});

const CorrectIcon = () => {
	const classes = Styles();

	return (
		<Icon className={classes.iconPosition}>
			<CheckIcon />
		</Icon>
	);
};

const IncorrectIcon = () => {
	const classes = Styles();

	return (
		<Icon className={classes.iconPosition}>
			<CloseIcon />
		</Icon>
	);
};

const generateAnswerButtonClassName = (
	practiceMode: PracticeMode,
	isCorrect: boolean,
	showNext: boolean
) => {
	const classes = Styles();

	switch (practiceMode) {
		case PracticeMode.ChooseReading:
			return classNames(
				classes.answerButtonReading,
				showNext &&
					(isCorrect ? classes.correctReading : classes.incorrectReading)
			);

		case PracticeMode.ChooseCharacter:
			return classNames(
				classes.answerButtonCharacter,
				showNext &&
					(isCorrect ? classes.correctCharacter : classes.incorrectCharacter)
			);

		default:
			return '';
	}
};

const AnswerButtons = (props: Props) => {
	const [showNext, setShowNext] = useState(false);
	const answerButtons = [] as any;
	const classes = Styles();

	const setShowNextTrue = () => {
		setShowNext(true);
	};

	[...props.options].forEach((option, index) => {
		const optionKana = data[option];
		if (index === props.correctIndex) {
			answerButtons.push(
				createAnswerButton(
					props.practiceMode,
					index,
					props.onCorrect,
					showNext,
					optionKana,
					props.kanaSelection,
					generateAnswerButtonClassName(props.practiceMode, true, showNext),
					CorrectIcon()
				)
			);
		} else {
			answerButtons.push(
				createAnswerButton(
					props.practiceMode,
					index,
					setShowNextTrue,
					showNext,
					optionKana,
					props.kanaSelection,
					generateAnswerButtonClassName(props.practiceMode, false, showNext),
					IncorrectIcon()
				)
			);
		}
	});

	return (
		<>
			<div className={classes.answerButtonsContainer}>{answerButtons}</div>
			{showNext && (
				<Button
					id={'next-button'}
					onClick={() => {
						setShowNext(false);
						props.onIncorrect();
					}}
				>
					{strings.button_next}
				</Button>
			)}
		</>
	);
};

export default AnswerButtons;
