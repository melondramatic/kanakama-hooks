import React from "react";
import { Pages } from "../constants";
import StandardButton from "../components/StandardButton";
import Logo from "../components/Logo";
import { makeStyles } from "@material-ui/styles";

interface Props {
	setCurrentPage: React.Dispatch<React.SetStateAction<Pages>>;
}

const Styles = makeStyles({
	pageContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	title: {
		fontSize: "30pt",
		margin: "12px",
		letterSpacing: "8px",
		fontWeight: 100,
	},
});

const TitlePage = ({ setCurrentPage }: Props) => {
	const classes = Styles();
	return (
		<div className={classes.pageContainer}>
			<Logo />
			<div className={classes.title}>kanakama</div>
			<StandardButton
				onClick={() => {
					setCurrentPage(Pages.PracticeSelectionPage);
				}}
			>
				start practice
			</StandardButton>
			<StandardButton
				onClick={() => {
					setCurrentPage(Pages.StatsPage);
				}}
			>
				view stats
			</StandardButton>
		</div>
	);
};

export default TitlePage;
