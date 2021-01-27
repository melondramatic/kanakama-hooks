import { makeStyles } from '@material-ui/styles';
import React from 'react';
import KanaImage from '../../components/KanaImage';
import { DetailKanaData, KanaStat, KanaType } from '../../constants';
import data from '../../kana.json';
import { strings } from '../../strings';

interface Props {
	parsedStat: KanaStat;
	index: number;
	isHiragana: boolean;
	setDetailKanaData: React.Dispatch<
		React.SetStateAction<DetailKanaData | null>
	>;
}

const Styles = makeStyles({
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
});

const Stat = (props: Props) => {
	const classes = Styles();
	const kana = data[props.index];
	const stat = props.isHiragana
		? props.parsedStat.hiraganaStat
		: props.parsedStat.katakanaStat;
	const totalOccurrences =
		stat.chooseCharacterOccurrences + stat.chooseReadingOccurrences;
	const totalCorrect = stat.chooseCharacterCorrect + stat.chooseReadingCorrect;
	const accuracy =
		totalOccurrences > 0
			? `${((totalCorrect / totalOccurrences) * 100).toFixed(2)}%`
			: strings.stats_na;

	return (
		<div
			key={kana.name}
			className={classes.itemContainer}
			onClick={() => {
				props.setDetailKanaData({
					index: props.index,
					isHiragana: props.isHiragana,
					stat,
				});
			}}
		>
			<div className={classes.nameContainer}>
				<div>{kana.name}</div>
				<KanaImage
					kanaSelection={
						props.isHiragana ? KanaType.Hiragana : KanaType.Katakana
					}
					optionKana={kana}
					className={classes.kanaImage}
				/>
			</div>
			<div className={classes.detailsContainer}>
				<div>{`${strings.stats_timesSeen}: ${totalOccurrences}`}</div>
				<div>{`${strings.stats_correctAnswers}: ${totalCorrect}`}</div>
				<div>{`${strings.stats_accuracy}: ${accuracy}`}</div>
			</div>
		</div>
	);
};

export default Stat;
