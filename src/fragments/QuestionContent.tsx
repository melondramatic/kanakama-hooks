import React from 'react';
import { makeStyles } from '@material-ui/styles';

import { PracticeMode, KanaType } from '../constants';
import data from '../kana.json';
import KanaImage from '../components/KanaImage';
import { strings } from '../strings';

interface Props {
	practiceMode: PracticeMode;
	kanaSelection: KanaType;
	correctIndex: number;
	options: Set<number>;
}

const Styles = makeStyles({
	selectedKana: {
		fontSize: '24pt',
		fontStyle: 'italic',
		padding: '16px',
	},
	kanaImage: {
		height: '400px',
	},
	questionText: {
		fontSize: '16pt',
	},
});

const QuestionContent = (props: Props) => {
	const classes = Styles();

	const correctKana = data[[...props.options][props.correctIndex]];

	switch (props.practiceMode) {
		case PracticeMode.ChooseCharacter:
			return (
				<>
					<div className={classes.questionText}>
						{strings.question_character}
					</div>
					<div className={classes.selectedKana}>{correctKana.name}</div>
				</>
			);

		case PracticeMode.ChooseReading:
			return (
				<>
					<div className={classes.questionText}>{strings.question_reading}</div>
					<KanaImage
						kanaSelection={props.kanaSelection}
						optionKana={correctKana}
						className={classes.kanaImage}
					/>
				</>
			);

		default:
			return <></>;
	}
};

export default QuestionContent;
