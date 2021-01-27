import React from 'react';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';

import KanaImage from '../../components/KanaImage';
import { KanaType, DetailKanaData } from '../../constants';
import data from '../../kana.json';
import ExerciseStatData from './ExerciseStatData';
import { strings } from '../../strings';

const Styles = makeStyles({
	panelContainer: {
		display: 'flex',
		flexDirection: 'column',
		flexBasis: '30%',
		alignItems: 'center',
		padding: '16px',
	},
	buttonContainer: {
		alignSelf: 'flex-start',
	},
	nameContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
		maxWidth: '70%',
	},
	kanaName: {
		fontSize: '28pt',
		fontStyle: 'italic',
	},
	kanaImage: {
		width: '70%',
		minWidth: '70%',
		maxWidth: '70%',
	},
	statsContainer: {
		alignSelf: 'flex-start',
		textAlign: 'left',
		padding: '16px',
	},
	header: {
		fontSize: '16pt',
		paddingBottom: '8px',
	},
	displayNone: { display: 'none' },
});

const SidePanel = ({
	detailKanaData,
	onClose,
}: {
	detailKanaData: DetailKanaData;
	onClose: Function;
}) => {
	const classes = Styles();
	const kana = data[detailKanaData.index];

	return (
		<div className={classes.panelContainer}>
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
				<div
					className={classes.header}
				>{`${strings.stats_detailedStats}:`}</div>
				<ExerciseStatData
					title={`${strings.stats_characterStats}:`}
					occurrences={detailKanaData.stat.chooseCharacterOccurrences}
					correct={detailKanaData.stat.chooseCharacterCorrect}
				/>
				<ExerciseStatData
					title={`${strings.stats_readingStats}:`}
					occurrences={detailKanaData.stat.chooseReadingOccurrences}
					correct={detailKanaData.stat.chooseReadingCorrect}
				/>
			</div>
		</div>
	);
};

export default SidePanel;
