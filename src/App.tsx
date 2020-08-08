import React from "react";
import Routing from "./Routing";
import { makeStyles } from "@material-ui/styles";

const Styles = makeStyles({
	root: {
		display: "flex",
		justifyContent: "center",
		textAlign: "center",
		padding: "12px",
	},
});

function App() {
	const classes = Styles();
	return (
		<div className={classes.root}>
			<Routing />
		</div>
	);
}

export default App;
