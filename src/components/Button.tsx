import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
	Button as MaterialButton,
	ButtonClassKey,
	ButtonProps,
	StandardProps,
} from '@material-ui/core';
import classNames from 'classnames';

const Styles = makeStyles({
	button: {
		background: 'none',
		border: 'solid black 2px',
		margin: '8px',
		fontSize: '12pt',
		textTransform: 'uppercase',
		letterSpacing: '1px',
	},
	disabled: {
		color: 'black',
	},
});

const Button = (props: StandardProps<ButtonProps, ButtonClassKey>) => {
	const classes = Styles();
	const buttonClassName = classNames(classes.button, props.className);
	return (
		<MaterialButton
			{...props}
			className={buttonClassName}
			size={props.size ?? 'medium'}
			variant={props.variant ?? 'outlined'}
			disableRipple={true}
		>
			{props.children}
		</MaterialButton>
	);
};

export default Button;
