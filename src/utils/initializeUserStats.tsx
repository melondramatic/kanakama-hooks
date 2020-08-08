import { KanaStat } from "../constants";

export const initializeUserStats = () => {
	const userStats = [] as KanaStat[];
	for (let i = 0; i < 46; i++) {
		const kanaStat: KanaStat = {
			hiraganaStat: {
				chooseSoundOcurrences: 0,
				chooseSoundCorrect: 0,
				chooseImageOcurrences: 0,
				chooseImageCorrect: 0,
			},
			katakanaStat: {
				chooseSoundOcurrences: 0,
				chooseSoundCorrect: 0,
				chooseImageOcurrences: 0,
				chooseImageCorrect: 0,
			},
		};
		userStats.push(kanaStat);
	}
	localStorage.setItem("userStats", JSON.stringify(userStats));
};
