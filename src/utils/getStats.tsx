import { LocalStorage } from '../constants';
import { GetStats, UpdateStats } from './axiosCalls';
import { updateUserStats } from './updateUserStats';

export const getStats = (
	setData: React.Dispatch<React.SetStateAction<string | null>>,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
	if (localStorage.getItem(LocalStorage.User)) {
		if (localStorage.getItem(LocalStorage.UpdateList)) {
			UpdateStats()
				.then(() => {
					localStorage.removeItem(LocalStorage.UpdateList);
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => fetchStats(setData, setIsLoading));
		} else {
			fetchStats(setData, setIsLoading);
		}
	} else {
		const userStats = localStorage.getItem(LocalStorage.UserStats);
		if (!userStats) {
			setData(null);
		} else if (localStorage.getItem(LocalStorage.UpdateList)) {
			setData(updateUserStats());
		} else {
			setData(userStats);
		}
		setIsLoading(false);
	}
};

const fetchStats = (
	setData: React.Dispatch<React.SetStateAction<string | null>>,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
	GetStats()
		.then((result) => {
			setData(result.data.stats);
		})
		.catch((error) => {
			console.log(error);
		})
		.finally(() => setIsLoading(false));
};
