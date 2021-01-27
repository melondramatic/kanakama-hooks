import React, { useEffect, useState } from 'react';
import StatsPage from '../pages/StatsPage';
import { getStats } from '../utils/getStats';
import LoadingPage from './LoadingPage';

const StatsPageInjector = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState<string | null>(null);

	useEffect(() => {
		getStats(setData, setIsLoading);
	}, []);

	return isLoading ? <LoadingPage /> : <StatsPage data={data} />;
};

export default StatsPageInjector;
