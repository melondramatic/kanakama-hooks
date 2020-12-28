import { KanaStat } from "../constants";

export const initializeUserStats = () => {
	const userStats = [] as KanaStat[];
	for (let i = 0; i < 46; i++) {
		const kanaStat: KanaStat = {
			hiraganaStat: {
				chooseReadingOcurrences: 0,
				chooseReadingCorrect: 0,
				chooseCharacterOcurrences: 0,
				chooseCharacterCorrect: 0,
			},
			katakanaStat: {
				chooseReadingOcurrences: 0,
				chooseReadingCorrect: 0,
				chooseCharacterOcurrences: 0,
				chooseCharacterCorrect: 0,
			},
		};
		userStats.push(kanaStat);
	}
	localStorage.setItem("userStats", JSON.stringify(userStats));
};
