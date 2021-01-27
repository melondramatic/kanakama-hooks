import { KanaStat, LocalStorage } from '../constants';

export const initializeUserStats = () => {
	const userStats = [] as KanaStat[];
	for (let i = 0; i < 46; i++) {
		const kanaStat: KanaStat = {
			hiraganaStat: {
				chooseReadingOccurrences: 0,
				chooseReadingCorrect: 0,
				chooseCharacterOccurrences: 0,
				chooseCharacterCorrect: 0,
			},
			katakanaStat: {
				chooseReadingOccurrences: 0,
				chooseReadingCorrect: 0,
				chooseCharacterOccurrences: 0,
				chooseCharacterCorrect: 0,
			},
		};
		userStats.push(kanaStat);
	}
	localStorage.setItem(LocalStorage.UserStats, JSON.stringify(userStats));
};
