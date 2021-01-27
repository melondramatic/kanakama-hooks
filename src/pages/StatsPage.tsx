import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import Button from '../components/Button';
import Dialog from '../components/Dialog';
import { DetailKanaData, KanaType, LocalStorage, Pages } from '../constants';
import PageBase from '../fragments/PageBase';
import SidePanel from '../fragments/Stats/StatsSidePanel';
import StatsSummary from '../fragments/Stats/StatsSummary';
import { RoutingContext } from '../Routing';
import { strings } from '../strings';

interface Props {
	data: string | null;
}

const Styles = makeStyles({
	pageContainer: {
		display: 'flex',
		width: '100%',
	},
	statsContainer: {
		width: '100%',
		height: window.innerHeight - 120,
		overflowY: 'scroll',
	},
	title: {
		fontSize: '20pt',
	},
	dialogText: {
		padding: '24px',
	},
	noStats: {
		fontSize: '16pt',
		padding: '16px',
	},
});

const StatsPage = (props: Props) => {
	const [detailKanaData, setDetailKanaData] = useState<DetailKanaData | null>(
		null
	);
	const [showAlert, setShowAlert] = useState(false);
	const { setCurrentPage } = useContext(RoutingContext);
	const classes = Styles();

	const onClose = () => {
		setDetailKanaData(null);
	};

	const statsPageContent =
		props.data === null ? (
			<div>
				<div className={classes.noStats}>{strings.stats_noStats}</div>
				<Button
					id={'practice-button'}
					onClick={() => {
						setCurrentPage(Pages.PracticeSelectionPage);
					}}
				>
					{strings.button_practice}
				</Button>
			</div>
		) : (
			<>
				{!localStorage.getItem(LocalStorage.User) && (
					<div>
						<div>{strings.stats_register}</div>
						<Button
							id={'create-account-button'}
							onClick={() => {
								setCurrentPage(Pages.RegisterPage);
							}}
						>
							{strings.button_register}
						</Button>
					</div>
				)}
				<StatsSummary
					kanaType={KanaType.Hiragana}
					setDetailKanaData={setDetailKanaData}
					stats={props.data}
				/>
				<StatsSummary
					kanaType={KanaType.Katakana}
					setDetailKanaData={setDetailKanaData}
					stats={props.data}
				/>
			</>
		);

	const buttons: JSX.Element[] = [];

	if (
		!localStorage.getItem(LocalStorage.User) &&
		localStorage.getItem(LocalStorage.UserStats)
	) {
		buttons.push(
			<Button
				id={'clear-stats-button'}
				key={'clear-stats-button'}
				onClick={() => {
					setShowAlert(true);
				}}
				size={'small'}
			>
				{strings.button_clearData}
			</Button>
		);
	}

	return (
		<PageBase buttons={buttons}>
			<div className={classes.pageContainer}>
				<div className={classes.statsContainer}>
					<div className={classes.title}>{strings.stats_title}</div>
					{statsPageContent}
				</div>
				{detailKanaData && (
					<SidePanel detailKanaData={detailKanaData} onClose={onClose} />
				)}
			</div>

			<Dialog
				isOpen={showAlert}
				contentText={strings.dialog_clearStats}
				leftButtonAction={() => {
					localStorage.removeItem(LocalStorage.UserStats);
					setShowAlert(false);
				}}
				leftButtonText={strings.button_clearData}
				rightButtonAction={() => {
					setShowAlert(false);
				}}
				rightButtonText={strings.button_cancel}
			/>
		</PageBase>
	);
};

export default StatsPage;
