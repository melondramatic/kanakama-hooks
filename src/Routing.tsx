import React, { createContext, useState } from 'react';

import { Pages } from './constants';
import TitlePage from './pages/TitlePage';
import PracticeModePage from './pages/PracticeModePage';
import RegisterPage from './pages/RegisterPage';
import SignInPage from './pages/SignInPage';
import StatsPageInjector from './fragments/StatsPageInjector';

export const RoutingContext = createContext({
	setCurrentPage: {} as React.Dispatch<React.SetStateAction<Pages>>,
});

const Routing = () => {
	const [currentPage, setCurrentPage] = useState(Pages.MainPage);

	var page;
	switch (currentPage) {
		case Pages.MainPage:
			page = <TitlePage />;
			break;

		case Pages.PracticeSelectionPage:
			page = <PracticeModePage />;
			break;

		case Pages.StatsPage:
			page = <StatsPageInjector />;
			break;

		case Pages.RegisterPage:
			page = <RegisterPage />;
			break;

		case Pages.SignInPage:
			page = <SignInPage />;
			break;

		default:
			page = <TitlePage />;
			break;
	}

	return (
		<RoutingContext.Provider value={{ setCurrentPage }}>
			{page}
		</RoutingContext.Provider>
	);
};

export default Routing;
