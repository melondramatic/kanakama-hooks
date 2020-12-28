import React from "react";
import classNames from "classnames";
import KanaImage from "../components/KanaImage";
import { Stat, KanaType } from "../constants";
import { makeStyles } from "@material-ui/styles";
import data from "../kana.json";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

export interface DetailKanaData {
	index: number;
	isHiragana: boolean;
	stat: Stat;
}

interface ExcerciseStatDataProps {
	title: string;
	occurrences: number;
	correct: number;
}

const Styles = makeStyles({
	panelContainer: {
		display: "flex",
		flexDirection: "column",
		flexBasis: "30%",
		alignItems: "center",
		padding: "16px",
	},
	buttonContainer: {
		alignSelf: "flex-start",
	},
	nameContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "center",
		maxWidth: "70%",
	},
	kanaName: {
		fontSize: "28pt",
		fontStyle: "italic",
	},
	kanaImage: {
		width: "70%",
		minWidth: "70%",
		maxWidth: "70%",
	},
	statsContainer: {
		alignSelf: "flex-start",
		textAlign: "left",
		padding: "16px",
	},
	header: {
		fontSize: "16pt",
		paddingBottom: "8px",
	},
	statsData: {
		paddingBottom: "8px",
	},
	statsTitle: {
		fontSize: "14pt",
	},
	displayNone: { display: "none" },
});

const ExerciseStatData = (props: ExcerciseStatDataProps) => {
	const classes = Styles();
	const accuracy =
		props.occurrences > 0
			? `${((props.correct / props.occurrences) * 100).toFixed(2)}%`
			: "N/A";

	return (
		<div className={classes.statsData}>
			<div className={classes.statsTitle}>{props.title}</div>
			<div>Times seen: {props.occurrences}</div>
			<div>Correct answers: {props.correct}</div>
			<div>Accuracy: {accuracy}</div>
		</div>
	);
};

const SidePanel = ({
	detailKanaData,
	isPanelHidden,
	onClose,
}: {
	detailKanaData: DetailKanaData | null;
	isPanelHidden: boolean;
	onClose: Function;
}) => {
	const classes = Styles();

	if (!detailKanaData)
		return (
			<div
				className={classNames(
					classes.panelContainer,
					isPanelHidden && classes.displayNone
				)}
			>
				Error retrieving detailed stats data
			</div>
		);

	const kana = data[detailKanaData.index];

	return (
		<div
			className={classNames(
				classes.panelContainer,
				isPanelHidden && classes.displayNone
			)}
		>
			<div className={classes.buttonContainer}>
				<IconButton onClick={() => onClose()}>
					<CloseIcon />
				</IconButton>
			</div>
			<div className={classes.nameContainer}>
				<div className={classes.kanaName}>{kana.name}</div>
				<KanaImage
					kanaSelection={
						detailKanaData.isHiragana ? KanaType.Hiragana : KanaType.Katakana
					}
					optionKana={kana}
					className={classes.kanaImage}
				/>
			</div>
			<div className={classes.statsContainer}>
				<div className={classes.header}>Detailed stats:</div>
				<ExerciseStatData
					title={"Choose Character stats:"}
					occurrences={detailKanaData.stat.chooseCharacterOcurrences}
					correct={detailKanaData.stat.chooseCharacterCorrect}
				/>
				<ExerciseStatData
					title={"Choose Reading stats:"}
					occurrences={detailKanaData.stat.chooseReadingOcurrences}
					correct={detailKanaData.stat.chooseReadingCorrect}
				/>
			</div>
		</div>
	);
};

export default SidePanel;
