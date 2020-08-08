import React, { useState } from "react";
import { KanaType, Pages } from "../constants";

import StandardButton from "../components/StandardButton";
import { makeStyles } from "@material-ui/styles";
import SidePanel, { DetailKanaData } from "../fragments/StatsSidePanel";
import StatsSummary from "../fragments/StatsSummary";
import PageBase from "../fragments/PageBase";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

interface Props {
	setCurrentPage: React.Dispatch<React.SetStateAction<Pages>>;
}

const Styles = makeStyles({
	pageContainer: {
		display: "flex",
		width: "100%",
	},
	statsContainer: {
		width: "100%",
		height: window.innerHeight - 120,
		overflowY: "scroll",
	},
	title: {
		fontSize: "20pt",
	},
	dialogText: {
		padding: "24px",
	},
	noStats: {
		fontSize: "16pt",
		padding: "16px",
	},
});

const StatsPage = ({ setCurrentPage }: Props) => {
	const [isPanelHidden, setIsPanelHidden] = useState(true);
	const [detailKanaData, setDetailKanaData] = useState<DetailKanaData | null>(
		null
	);
	const [showAlert, setShowAlert] = useState(false);
	const classes = Styles();

	const userStats = localStorage.getItem("userStats");

	const onClose = () => {
		setIsPanelHidden(true);
	};

	const statsPageContent =
		userStats === null ? (
			<div>
				<div className={classes.noStats}>
					There are no stats to display. Start practicing to get some data!
				</div>
				<StandardButton
					onClick={() => {
						setCurrentPage(Pages.PracticeSelectionPage);
					}}
				>
					Start Practice
				</StandardButton>
			</div>
		) : (
			<>
				<StatsSummary
					kanaType={KanaType.Hiragana}
					setDetailKanaData={setDetailKanaData}
					setIsPanelHidden={setIsPanelHidden}
				/>
				<StatsSummary
					kanaType={KanaType.Katakana}
					setDetailKanaData={setDetailKanaData}
					setIsPanelHidden={setIsPanelHidden}
				/>
				<StandardButton
					onClick={() => {
						setShowAlert(true);
					}}
				>
					clear stats
				</StandardButton>
			</>
		);

	return (
		<PageBase setCurrentPage={setCurrentPage}>
			<div className={classes.pageContainer}>
				<div className={classes.statsContainer}>
					<div className={classes.title}>Your Practice Stats</div>
					{statsPageContent}
				</div>
				<SidePanel
					detailKanaData={detailKanaData}
					isPanelHidden={isPanelHidden}
					onClose={onClose}
				/>
			</div>
			<Dialog open={showAlert}>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to clear your practice statistics? This action
						cannot be undone.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<StandardButton
						onClick={() => {
							localStorage.removeItem("userStats");
							setShowAlert(false);
						}}
					>
						Clear Data
					</StandardButton>
					<StandardButton
						onClick={() => {
							setShowAlert(false);
						}}
					>
						Cancel
					</StandardButton>
				</DialogActions>
			</Dialog>
		</PageBase>
	);
};

export default StatsPage;
