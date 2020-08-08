import React from "react";
import { PracticeMode, KanaType } from "../constants";
import data from "../kana.json";
import AnswerButtons from "./AnswerButtons";
import { makeStyles } from "@material-ui/styles";
import KanaImage from "../components/KanaImage";

interface Props {
	practiceMode: PracticeMode;
	kanaSelection: KanaType;
	correctIndex: number;
	options: Set<number>;
	onCorrect: Function;
	onIncorrect: Function;
}

const Styles = makeStyles({
	selectedKana: {
		fontSize: "24pt",
		fontStyle: "italic",
		padding: "16px",
	},
	kanaImage: {
		height: "400px",
	},
	questionText: {
		fontSize: "16pt",
	},
});

const QuestionContent = (props: Props) => {
	const classes = Styles();

	const question = (): React.ReactElement => {
		const correctKana = data[[...props.options][props.correctIndex]];

		switch (props.practiceMode) {
			case PracticeMode.ChooseImage:
				return (
					<>
						<div className={classes.questionText}>
							Choose the kana that corresponds to the sound below
						</div>
						<div className={classes.selectedKana}>{correctKana.name}</div>
					</>
				);

			case PracticeMode.ChooseSound:
				return (
					<>
						<div className={classes.questionText}>
							Choose the sound that corresponds to the image below
						</div>
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

	return (
		<>
			{question()}
			<AnswerButtons
				practiceMode={props.practiceMode}
				kanaSelection={props.kanaSelection}
				options={props.options}
				correctIndex={props.correctIndex}
				onCorrect={props.onCorrect}
				onIncorrect={props.onIncorrect}
			/>
		</>
	);
};

export default QuestionContent;
