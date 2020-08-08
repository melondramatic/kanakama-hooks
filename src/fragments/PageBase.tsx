import React, { ReactElement } from "react";
import { Pages } from "../constants";
import StandardButton from "../components/StandardButton";
import { makeStyles } from "@material-ui/styles";

interface Props {
	children: any;
	setCurrentPage: React.Dispatch<React.SetStateAction<Pages>>;
	buttons?: ReactElement[];
}

const Styles = makeStyles({
	baseContainer: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
	},
	navigationContainer: {
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "space-between",
	},
	name: {
		fontSize: "12pt",
		letterSpacing: "8px",
		fontWeight: 100,
	},
	contentContainer: {
		display: "flex",
		justifyContent: "center",
	},
});

const PageBase = (props: Props) => {
	const classes = Styles();

	return (
		<div className={classes.baseContainer}>
			<div className={classes.navigationContainer}>
				<div className={classes.name}>kanakama</div>
				<>
					<StandardButton
						onClick={() => {
							props.setCurrentPage(Pages.MainPage);
						}}
						size={"small"}
					>
						Main Page
					</StandardButton>
					{props.buttons}
				</>
			</div>
			<div className={classes.contentContainer}>{props.children}</div>
		</div>
	);
};

export default PageBase;
