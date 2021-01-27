import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { KanaType, PracticeMode } from '../constants';
import data from '../kana.json';
import Counter from '../components/Counter';
import QuestionContent from '../fragments/QuestionContent';
import { addToUpdateList } from '../utils/addToUpdateList';
import { randomNumber } from '../utils/randomNumber';
import AnswerButtons from '../fragments/AnswerButtons/AnswerButtons';
import { strings } from '../strings';

interface Props {
	kanaSelection: KanaType;
	practiceMode: PracticeMode;
	optionCount: number;
}

const Styles = makeStyles({
	pageContainer: {
		width: '60%',
	},
	counterContainer: {
		display: 'flex',
		justifyContent: 'center',
	},
});

const PracticePage = ({ kanaSelection, practiceMode, optionCount }: Props) => {
	const [incorrectCount, setIncorrectCount] = useState(0);
	const [correctCount, setCorrectCount] = useState(0);
	const classes = Styles();

	const createQuestion = () => {
		const options = new Set<number>();

		while (options.size < optionCount) {
			options.add(randomNumber(data.length));
		}
		const correctIndex = randomNumber(optionCount);
		const correctDataIndex = [...options][correctIndex];

		let processedKanaSelection = KanaType.Unselected;
		if (kanaSelection === KanaType.Both) {
			const randomKana = randomNumber(2);
			if (randomKana === 0) {
				processedKanaSelection = KanaType.Hiragana;
			} else {
				processedKanaSelection = KanaType.Katakana;
			}
		} else {
			processedKanaSelection = kanaSelection;
		}

		const onCorrect = () => {
			setCorrectCount(correctCount + 1);
			addToUpdateList(
				correctDataIndex,
				processedKanaSelection,
				practiceMode,
				true
			);
		};

		const onIncorrect = () => {
			setIncorrectCount(incorrectCount + 1);
			addToUpdateList(
				correctDataIndex,
				processedKanaSelection,
				practiceMode,
				false
			);
		};

		return (
			<>
				<QuestionContent
					practiceMode={practiceMode}
					kanaSelection={kanaSelection}
					options={options}
					correctIndex={correctIndex}
				/>
				<AnswerButtons
					practiceMode={practiceMode}
					kanaSelection={kanaSelection}
					options={options}
					correctIndex={correctIndex}
					onCorrect={onCorrect}
					onIncorrect={onIncorrect}
				/>
			</>
		);
	};

	return (
		<div data-testid={'practice-page'} className={classes.pageContainer}>
			{createQuestion()}
			<div className={classes.counterContainer}>
				<Counter
					id={'correct-counter'}
					title={`${strings.counter_correct}:`}
					count={correctCount}
				/>
				<Counter
					id={'incorrect-counter'}
					title={`${strings.counter_incorrect}:`}
					count={incorrectCount}
				/>
			</div>
		</div>
	);
};

export default PracticePage;
