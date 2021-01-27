import React, { useState, ReactElement } from 'react';
import { makeStyles } from '@material-ui/styles';

import {
	KanaType,
	PracticeMode,
	LocalStorage,
	OPTION_COUNT,
} from '../constants';
import Button from '../components/Button';
import PageBase from '../fragments/PageBase';
import { initializeUserStats } from '../utils/initializeUserStats';
import PracticePage from './PracticePage';
import { strings } from '../strings';

const Styles = makeStyles({
	header: {
		fontSize: '20pt',
		padding: '8px',
	},
});

const PracticeModePage = () => {
	const [selectedKana, setSelectedKana] = useState(KanaType.Unselected);
	const [selectedMode, setSelectedMode] = useState(PracticeMode.Unselected);
	const classes = Styles();

	const kanaButtons = () => {
		return (
			<>
				<Button
					id={'hiragana-button'}
					onClick={() => setSelectedKana(KanaType.Hiragana)}
				>
					{strings.practice_hiragana}
				</Button>
				<Button
					id={'katakana-button'}
					onClick={() => setSelectedKana(KanaType.Katakana)}
				>
					{strings.practice_katakana}
				</Button>
				<Button
					id={'both-button'}
					onClick={() => setSelectedKana(KanaType.Both)}
				>
					{strings.practice_both}
				</Button>
			</>
		);
	};

	const modeButtons = () => {
		return (
			<>
				<Button
					id={'reading-button'}
					onClick={() => {
						setSelectedMode(PracticeMode.ChooseReading);
					}}
				>
					{strings.practice_character}
				</Button>
				<Button
					id={'character-button'}
					onClick={() => {
						setSelectedMode(PracticeMode.ChooseCharacter);
					}}
				>
					{strings.practice_reading}
				</Button>
			</>
		);
	};

	const renderButtons = () => {
		if (selectedKana === KanaType.Unselected) {
			return (
				<div>
					<div className={classes.header}>{strings.practice_selectKana}</div>
					{kanaButtons()}
				</div>
			);
		} else {
			return (
				<div>
					<div className={classes.header}>{strings.practice_selectMode}</div>
					{modeButtons()}
				</div>
			);
		}
	};

	const renderPageContents = () => {
		const user = localStorage.getItem(LocalStorage.User);
		const userStats = localStorage.getItem(LocalStorage.UserStats);

		if (user === null && userStats === null) {
			initializeUserStats();
		}

		if (selectedMode === PracticeMode.Unselected) {
			return renderButtons();
		} else {
			return (
				<PracticePage
					practiceMode={selectedMode}
					kanaSelection={selectedKana}
					optionCount={OPTION_COUNT}
				/>
			);
		}
	};

	const buttons = [] as ReactElement[];

	const backButton = (
		<Button
			id={'back-button'}
			key={'back-button'}
			onClick={() => {
				setSelectedKana(KanaType.Unselected);
			}}
			size={'small'}
		>
			{strings.button_back}
		</Button>
	);

	if (
		selectedKana !== KanaType.Unselected &&
		selectedMode === PracticeMode.Unselected
	) {
		buttons.push(backButton);
	}

	return <PageBase buttons={buttons}>{renderPageContents()}</PageBase>;
};

export default PracticeModePage;
