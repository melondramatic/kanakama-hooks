import React, { ReactElement, useState } from 'react';
import classNames from 'classnames';
import data from './../kana.json';
import KanaImage from '../components/KanaImage';
import { KanaType, KanaStat } from '../constants';
import { DetailKanaData } from './StatsSidePanel';
import { makeStyles } from '@material-ui/styles';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

interface Props {
	kanaType: KanaType;
	setDetailKanaData: React.Dispatch<
		React.SetStateAction<DetailKanaData | null>
	>;
	setIsPanelHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

const Styles = makeStyles({
	summaryContainer: {
		display: 'flex',
		flexDirection: 'column',
	},
	statsItemsContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	itemContainer: {
		padding: '16px',
	},
	nameContainer: {
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		fontSize: '18pt',
		fontStyle: 'italic',
	},
	kanaImage: {
		height: '40px',
	},
	detailsContainer: {
		textAlign: 'left',
	},
	title: {
		textAlign: 'left',
		fontSize: '20pt',
		display: 'flex',
		alignItems: 'center',
	},
	displayNone: {
		display: 'none',
	},
});

const buildStat = (
	parsedStat: KanaStat,
	index: number,
	isHiragana: boolean,
	setDetailKanaData: React.Dispatch<
		React.SetStateAction<DetailKanaData | null>
	>,
	setIsPanelHidden: React.Dispatch<React.SetStateAction<boolean>>
) => {
	const classes = Styles();
	const kana = data[index];
	const stat = isHiragana ? parsedStat.hiraganaStat : parsedStat.katakanaStat;
	const totalOcurrences =
		stat.chooseCharacterOcurrences + stat.chooseReadingOcurrences;
	const totalCorrect = stat.chooseCharacterCorrect + stat.chooseReadingCorrect;
	const accuracy =
		totalOcurrences > 0
			? `${((totalCorrect / totalOcurrences) * 100).toFixed(2)}%`
			: 'N/A';
	return (
		<div
			key={kana.name}
			className={classes.itemContainer}
			onClick={() => {
				setDetailKanaData({ index, isHiragana, stat });
				setIsPanelHidden(false);
			}}
		>
			<div className={classes.nameContainer}>
				<div>{kana.name}</div>
				<KanaImage
					kanaSelection={isHiragana ? KanaType.Hiragana : KanaType.Katakana}
					optionKana={kana}
					className={classes.kanaImage}
				/>
			</div>
			<div className={classes.detailsContainer}>
				<div>Times seen: {totalOcurrences}</div>
				<div>Correct answers: {totalCorrect}</div>
				<div>Accuracy: {accuracy}</div>
			</div>
		</div>
	);
};

const StatsSummary = (props: Props) => {
	const [isCollapsed, setIsCollapsed] = useState(true);
	const classes = Styles();

	const userStats = localStorage.getItem('userStats');

	if (userStats === null) {
		return null;
	}

	const parsedStats: KanaStat[] = JSON.parse(userStats);
	const statsItems = [] as ReactElement[];

	parsedStats.forEach((parsedStat, index) => {
		const statItem = buildStat(
			parsedStat,
			index,
			props.kanaType === KanaType.Hiragana,
			props.setDetailKanaData,
			props.setIsPanelHidden
		);
		statsItems.push(statItem);
	});

	return (
		<div className={classes.summaryContainer}>
			<div
				className={classes.title}
				onClick={() => {
					setIsCollapsed(!isCollapsed);
				}}
			>
				{isCollapsed ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
				{props.kanaType === KanaType.Hiragana
					? 'Hiragana Stats'
					: 'Katakana Stats'}
			</div>
			<div
				className={classNames(
					classes.statsItemsContainer,
					isCollapsed && classes.displayNone
				)}
			>
				{statsItems}
			</div>
		</div>
	);
};

export default StatsSummary;
