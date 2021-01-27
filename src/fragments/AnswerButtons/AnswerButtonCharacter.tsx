import { makeStyles } from '@material-ui/styles';
import React, { ReactElement } from 'react';

import KanaImage from '../../components/KanaImage';
import { Kana, KanaType } from '../../constants';

interface Props {
	id: string;
	index: number;
	onClick: Function;
	classNames: string;
	disabled: boolean;
	optionKana: Kana;
	icon: ReactElement;
}

const Styles = makeStyles({
	answerImage: {
		height: '200px',
	},
	buttonWrapper: {
		position: 'relative',
	},
});

const AnswerButtonCharacter = (props: Props & { kanaSelection: KanaType }) => {
	const classes = Styles();

	return (
		<div className={classes.buttonWrapper}>
			{props.disabled && <>{props.icon}</>}
			<button
				id={props.id}
				key={props.index}
				onClick={() => {
					props.onClick();
				}}
				className={props.classNames}
				disabled={props.disabled}
			>
				<KanaImage
					kanaSelection={props.kanaSelection}
					optionKana={props.optionKana}
					className={classes.answerImage}
				/>
			</button>
		</div>
	);
};

export default AnswerButtonCharacter;
