import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import classNames from "classnames";

export interface StandardButtonProps {
	children: any;
	size?: "large" | "medium" | "small";
	onClick: Function;
	variant?: "outlined" | "contained" | "text";
	className?: string;
	disabled?: boolean;
}

const Styles = makeStyles({
	button: {
		background: "none",
		border: "solid black 2px",
		margin: "8px",
		fontSize: "12pt",
		textTransform: "uppercase",
		letterSpacing: "1px",
	},
	disabled: {
		color: "black",
	},
});

const StandardButton = (props: StandardButtonProps) => {
	const classes = Styles();
	const buttonClassName = classNames(classes.button, props.className);
	return (
		<Button
			className={buttonClassName}
			size={props.size ?? "medium"}
			onClick={() => props.onClick()}
			variant={props.variant ?? "outlined"}
			disableRipple={true}
			disabled={props.disabled}
		>
			{props.children}
		</Button>
	);
};

export default StandardButton;
