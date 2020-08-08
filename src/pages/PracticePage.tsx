import React, { useState } from "react";
import { Pages, KanaType, PracticeMode } from "../constants";
import data from "../kana.json";
import Counter from "../components/Counter";
import QuestionContent from "../fragments/QuestionContent";
import { makeStyles } from "@material-ui/styles";
import { updateUserStats } from "../utils/updateUserStats";

interface Props {
	setCurrentPage: React.Dispatch<React.SetStateAction<Pages>>;
	kanaSelection: KanaType;
	practiceMode: PracticeMode;
}

const Styles = makeStyles({
	pageContainer: {
		width: "60%",
	},
	counterContainer: {
		display: "flex",
		justifyContent: "center",
	},
});

const OPTION_COUNT = 3;

const PracticePage = ({ kanaSelection, practiceMode }: Props) => {
	const [incorrectCount, setIncorrectCount] = useState(0);
	const [correctCount, setCorrectCount] = useState(0);

	const classes = Styles();

	const createQuestion = () => {
		const options = new Set<number>();

		while (options.size < OPTION_COUNT) {
			options.add(Math.floor(Math.random() * data.length));
		}
		const correctIndex = Math.floor(Math.random() * OPTION_COUNT);
		const correctDataIndex = [...options][correctIndex];

		let processedKanaSelction = KanaType.Unselected;
		if (kanaSelection === KanaType.Both) {
			const randomKana = Math.floor(Math.random() * 2);
			if (randomKana === 0) {
				processedKanaSelction = KanaType.Hiragana;
			} else {
				processedKanaSelction = KanaType.Katakana;
			}
		} else {
			processedKanaSelction = kanaSelection;
		}

		const onCorrect = () => {
			setCorrectCount(correctCount + 1);
			updateUserStats(
				correctDataIndex,
				processedKanaSelction,
				practiceMode,
				true
			);
		};

		const onIncorrect = () => {
			setIncorrectCount(incorrectCount + 1);
			updateUserStats(
				correctDataIndex,
				processedKanaSelction,
				practiceMode,
				false
			);
		};

		return (
			<QuestionContent
				practiceMode={practiceMode}
				kanaSelection={processedKanaSelction}
				correctIndex={correctIndex}
				options={options}
				onCorrect={onCorrect}
				onIncorrect={onIncorrect}
			/>
		);
	};

	return (
		<div className={classes.pageContainer}>
			{createQuestion()}
			<div className={classes.counterContainer}>
				<Counter title={"correct:"} count={correctCount} />
				<Counter title={"incorrect:"} count={incorrectCount} />
			</div>
		</div>
	);
};

export default PracticePage;
