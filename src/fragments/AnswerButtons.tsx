import React, { useState, ReactElement } from 'react';
import data from '../kana.json';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { KanaType, PracticeMode, Kana } from '../constants';
import StandardButton from '../components/StandardButton';
import KanaImage from '../components/KanaImage';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { Icon } from '@material-ui/core';

interface Props {
	practiceMode: PracticeMode;
	options: Set<number>;
	correctIndex: number;
	onCorrect: Function;
	onIncorrect: Function;
	kanaSelection: KanaType;
}

interface AnswerButtonProps {
	index: number;
	onClick: Function;
	classNames: string;
	disabled: boolean;
	optionKana: Kana;
	icon: ReactElement;
}

const Styles = makeStyles({
	answerButtonContainer: {
		display: 'flex',
		justifyContent: 'center',
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
	answerImage: {
		height: '200px',
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
	buttonWrapper: {
		position: 'relative',
	},
	iconPosition: {
		position: 'absolute',
		top: '23px',
		left: '23px',
		zIndex: 1000,
	},
});

const AnswerButtonReading = (props: AnswerButtonProps) => {
	const classes = Styles();

	return (
		<div className={classes.buttonWrapper}>
			{props.disabled && <>{props.icon}</>}
			<StandardButton
				key={props.index}
				onClick={() => {
					props.onClick();
				}}
				className={props.classNames}
				disabled={props.disabled}
			>
				{props.optionKana.name}
			</StandardButton>
		</div>
	);
};

const AnswerButtonCharacter = (
	props: AnswerButtonProps & { kanaSelection: KanaType }
) => {
	const classes = Styles();

	return (
		<div className={classes.buttonWrapper}>
			{props.disabled && <>{props.icon}</>}
			<button
				key={props.index}
				onClick={() => {
					props.onClick();
				}}
				className={props.classNames}
				disabled={props.disabled}
			>
				<KanaImage
					kanaSelection={props.kanaSelection}
					optionKana={props.optionKana}
					className={classes.answerImage}
				/>
			</button>
		</div>
	);
};

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

const createAnswerButton = (
	practiceMode: PracticeMode,
	index: number,
	onClick: Function,
	showNext: boolean,
	optionKana: Kana,
	kanaSelection: KanaType,
	className: string,
	icon: ReactElement
) => {
	switch (practiceMode) {
		case PracticeMode.ChooseReading:
			return (
				<AnswerButtonReading
					key={index}
					index={index}
					onClick={() => onClick()}
					classNames={className}
					disabled={showNext}
					optionKana={optionKana}
					icon={icon}
				/>
			);

		case PracticeMode.ChooseCharacter:
			return (
				<AnswerButtonCharacter
					key={index}
					index={index}
					onClick={() => onClick()}
					classNames={className}
					disabled={showNext}
					optionKana={optionKana}
					kanaSelection={kanaSelection}
					icon={icon}
				/>
			);

		default:
			break;
	}
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
			<div className={classes.answerButtonContainer}>{answerButtons}</div>
			{showNext && (
				<StandardButton
					onClick={() => {
						setShowNext(false);
						props.onIncorrect();
					}}
				>
					Next
				</StandardButton>
			)}
		</>
	);
};

export default AnswerButtons;
