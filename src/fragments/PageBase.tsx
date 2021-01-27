import React, { ReactElement, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';

import { Pages } from '../constants';
import Button from '../components/Button';
import { RoutingContext } from '../Routing';
import { strings } from '../strings';

interface Props {
	children: any;
	buttons?: ReactElement[];
}

const Styles = makeStyles({
	baseContainer: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
	},
	navigationContainer: {
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
	},
	name: {
		fontSize: '12pt',
		letterSpacing: '8px',
		fontWeight: 100,
	},
	contentContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

const PageBase = (props: Props) => {
	const classes = Styles();
	const { setCurrentPage } = useContext(RoutingContext);

	return (
		<div className={classes.baseContainer}>
			<div className={classes.navigationContainer}>
				<div className={classes.name}>kanakama</div>
				<div>
					{props.buttons}
					<Button
						id={'main-page-button'}
						onClick={() => {
							setCurrentPage(Pages.MainPage);
						}}
						size={'small'}
					>
						{strings.button_mainPage}
					</Button>
				</div>
			</div>
			<div className={classes.contentContainer}>{props.children}</div>
		</div>
	);
};

export default PageBase;
