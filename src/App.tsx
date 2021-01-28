import React from 'react';
import { makeStyles } from '@material-ui/styles';

import Routing from './Routing';
import LogRocket from 'logrocket';

const Styles = makeStyles({
	root: {
		display: 'flex',
		justifyContent: 'center',
		textAlign: 'center',
		padding: '12px',
	},
});

if (process.env.NODE_ENV === 'production') {
	LogRocket.init('bhu1ag/kanakama', {
		dom: {
			inputSanitizer: true,
		},
		network: {
			requestSanitizer: (request) => {
				if (request.url.toLowerCase().indexOf('login') !== -1) {
					request.body = undefined;
				}
				return request;
			},
			responseSanitizer: (response) => {
				response.body = undefined;
				return response;
			},
		},
	});
}

function App() {
	const classes = Styles();
	return (
		<div className={classes.root}>
			<Routing />
		</div>
	);
}

export default App;
