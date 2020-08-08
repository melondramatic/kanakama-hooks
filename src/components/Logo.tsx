import React from "react";
import data from "../kana.json";
import { makeStyles } from "@material-ui/styles";

const Styles = makeStyles({
	logoContainer: {
		border: "black solid 4px",
		padding: "8px",
	},
	logoRow: {
		display: "flex",
	},
	image: {
		height: "96px",
		width: "96px",
	},
});

const LogoKana = ({ index }: { index: number }) => {
	const classes = Styles();
	const kana = data[index];
	return (
		<img
			src={require(`../images/${kana.katakanaPath}`)}
			className={classes.image}
		/>
	);
};

const Logo = () => {
	const classes = Styles();
	return (
		<div className={classes.logoContainer}>
			<div className={classes.logoRow}>
				<LogoKana index={5} />
				<LogoKana index={20} />
			</div>
			<div className={classes.logoRow}>
				<LogoKana index={5} />
				<LogoKana index={30} />
			</div>
		</div>
	);
};

export default Logo;
