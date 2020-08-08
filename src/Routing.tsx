import React, { useState } from "react";
import TitlePage from "./pages/TitlePage";
import PracticeModePage from "./pages/PracticeModePage";
import { Pages } from "./constants";
import StatsPage from "./pages/StatsPage";

const Routing = () => {
	const [currentPage, setCurrentPage] = useState(Pages.MainPage);

	switch (currentPage) {
		case Pages.MainPage:
			return <TitlePage setCurrentPage={setCurrentPage} />;

		case Pages.PracticeSelectionPage:
			return <PracticeModePage setCurrentPage={setCurrentPage} />;

		case Pages.StatsPage:
			return <StatsPage setCurrentPage={setCurrentPage} />;

		default:
			return <TitlePage setCurrentPage={setCurrentPage} />;
	}
};

export default Routing;
