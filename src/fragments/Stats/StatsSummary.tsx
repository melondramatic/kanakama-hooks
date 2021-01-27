import React, { ReactElement, useState } from 'react';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { makeStyles } from '@material-ui/styles';

import { KanaType, KanaStat, DetailKanaData } from '../../constants';
import Stat from './Stat';
import { strings } from '../../strings';

interface Props {
	kanaType: KanaType;
	setDetailKanaData: React.Dispatch<
		React.SetStateAction<DetailKanaData | null>
	>;
	stats: string;
}

const Styles = makeStyles({
	summaryContainer: {
		display: 'flex',
		flexDirection: 'column',
	},
	statsItemsContainer: {
		display: 'flex',
		flexDirection: 'column',
	},
	statsContainer: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
	},
	header: {
		textAlign: 'left',
		fontSize: '14pt',
		padding: '8px',
	},
	title: {
		textAlign: 'left',
		fontSize: '20pt',
		display: 'flex',
		alignItems: 'center',
	},
});

const StatsSummary = (props: Props) => {
	const [isCollapsed, setIsCollapsed] = useState(true);
	const classes = Styles();

	const userStats = props.stats;

	const parsedStats: KanaStat[] = JSON.parse(userStats);
	const statItems = [] as ReactElement[];

	parsedStats.forEach((parsedStat, index) => {
		const statItem = (
			<Stat
				key={index}
				parsedStat={parsedStat}
				index={index}
				isHiragana={props.kanaType === KanaType.Hiragana}
				setDetailKanaData={props.setDetailKanaData}
			/>
		);
		statItems.push(statItem);
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
					? strings.stats_hiraganaStats
					: strings.stats_katakanaStats}
			</div>
			<div className={classes.statsItemsContainer}>
				{!isCollapsed && (
					<>
						<div className={classes.header}>{strings.stats_subheading}</div>
						<div className={classes.statsContainer}>{statItems}</div>
					</>
				)}
			</div>
		</div>
	);
};

export default StatsSummary;
