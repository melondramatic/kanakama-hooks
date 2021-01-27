import { makeStyles } from '@material-ui/styles';
import React, { ReactElement } from 'react';
import Button from '../../components/Button';
import { Kana } from '../../constants';

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
	buttonWrapper: {
		position: 'relative',
	},
});

const AnswerButtonReading = (props: Props) => {
	const classes = Styles();

	return (
		<div className={classes.buttonWrapper}>
			{props.disabled && <>{props.icon}</>}
			<Button
				id={props.id}
				key={props.index}
				onClick={() => {
					props.onClick();
				}}
				className={props.classNames}
				disabled={props.disabled}
			>
				{props.optionKana.name}
			</Button>
		</div>
	);
};

export default AnswerButtonReading;
