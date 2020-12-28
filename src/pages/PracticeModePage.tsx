import React, { useState, ReactElement } from "react";
import { KanaType, PracticeMode, Pages } from "../constants";
import StandardButton from "../components/StandardButton";
import PracticePage from "./PracticePage";
import { initializeUserStats } from "../utils/initializeUserStats";
import PageBase from "../fragments/PageBase";
import { makeStyles } from "@material-ui/styles";

interface Props {
	setCurrentPage: React.Dispatch<React.SetStateAction<Pages>>;
}

const Styles = makeStyles({
	header: {
		fontSize: "20pt",
		padding: "8px",
	},
});

const PracticeModePage = ({ setCurrentPage }: Props) => {
	const [selectedKana, setSelectedKana] = useState(KanaType.Unselected);
	const [selectedMode, setSelectedMode] = useState(PracticeMode.Unselected);
	const classes = Styles();

	const kanaButtons = () => {
		return (
			<>
				<StandardButton onClick={() => setSelectedKana(KanaType.Hiragana)}>
					hiragana
				</StandardButton>
				<StandardButton onClick={() => setSelectedKana(KanaType.Katakana)}>
					katakana
				</StandardButton>
				<StandardButton onClick={() => setSelectedKana(KanaType.Both)}>
					both
				</StandardButton>
			</>
		);
	};

	const modeButtons = () => {
		return (
			<>
				<StandardButton
					onClick={() => {
						setSelectedMode(PracticeMode.ChooseReading);
					}}
				>
					Choose Reading
				</StandardButton>
				<StandardButton
					onClick={() => {
						setSelectedMode(PracticeMode.ChooseCharacter);
					}}
				>
					Choose Character
				</StandardButton>
			</>
		);
	};

	const renderButtons = () => {
		if (selectedKana === KanaType.Unselected) {
			return (
				<div>
					<div className={classes.header}>
						Which set of characters would you like to practice?
					</div>
					{kanaButtons()}
				</div>
			);
		} else {
			return (
				<div>
					<div className={classes.header}>How would you like to practice?</div>
					{modeButtons()}
				</div>
			);
		}
	};

	const renderPageContents = () => {
		const userStats = localStorage.getItem("userStats");

		if (userStats === null) {
			initializeUserStats();
		}

		if (selectedMode === PracticeMode.Unselected) {
			return renderButtons();
		} else {
			return (
				<PracticePage
					setCurrentPage={setCurrentPage}
					practiceMode={selectedMode}
					kanaSelection={selectedKana}
				/>
			);
		}
	};

	const buttons = [] as ReactElement[];

	const backButton = (
		<StandardButton
			key={"back-button"}
			onClick={() => {
				setSelectedKana(KanaType.Unselected);
			}}
			size={"small"}
		>
			back
		</StandardButton>
	);

	if (
		selectedKana !== KanaType.Unselected &&
		selectedMode === PracticeMode.Unselected
	) {
		buttons.push(backButton);
	}

	return (
		<PageBase setCurrentPage={setCurrentPage} buttons={buttons}>
			{renderPageContents()}
		</PageBase>
	);
};

export default PracticeModePage;
