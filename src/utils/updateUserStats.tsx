import { KanaType, KanaStat, PracticeMode } from "../constants";

export const updateUserStats = (
	index: number,
	kanaSelection: KanaType,
	practiceMode: PracticeMode,
	isCorrect: boolean
) => {
	const userStats = localStorage.getItem("userStats");

	if (userStats === null) return;

	const parsedUserStats: KanaStat[] = JSON.parse(userStats);
	const oldStat = parsedUserStats[index];
	const oldHiraganaStat = oldStat.hiraganaStat;
	const oldKatakanaStat = oldStat.katakanaStat;
	const hiraganaStat =
		kanaSelection === KanaType.Hiragana
			? {
					chooseSoundOcurrences:
						practiceMode === PracticeMode.ChooseSound
							? oldHiraganaStat.chooseSoundOcurrences + 1
							: oldHiraganaStat.chooseSoundOcurrences,
					chooseSoundCorrect:
						practiceMode === PracticeMode.ChooseSound && isCorrect
							? oldHiraganaStat.chooseSoundCorrect + 1
							: oldHiraganaStat.chooseSoundCorrect,
					chooseImageOcurrences:
						practiceMode === PracticeMode.ChooseImage
							? oldHiraganaStat.chooseImageOcurrences + 1
							: oldHiraganaStat.chooseImageOcurrences,
					chooseImageCorrect:
						practiceMode === PracticeMode.ChooseImage && isCorrect
							? oldHiraganaStat.chooseImageCorrect + 1
							: oldHiraganaStat.chooseImageCorrect,
			  }
			: oldHiraganaStat;

	const katakanaStat =
		kanaSelection === KanaType.Katakana
			? {
					chooseSoundOcurrences:
						practiceMode === PracticeMode.ChooseSound
							? oldKatakanaStat.chooseSoundOcurrences + 1
							: oldKatakanaStat.chooseSoundOcurrences,
					chooseSoundCorrect:
						practiceMode === PracticeMode.ChooseSound && isCorrect
							? oldKatakanaStat.chooseSoundCorrect + 1
							: oldKatakanaStat.chooseSoundCorrect,
					chooseImageOcurrences:
						practiceMode === PracticeMode.ChooseImage
							? oldKatakanaStat.chooseImageOcurrences + 1
							: oldKatakanaStat.chooseImageOcurrences,
					chooseImageCorrect:
						practiceMode === PracticeMode.ChooseImage && isCorrect
							? oldKatakanaStat.chooseImageCorrect + 1
							: oldKatakanaStat.chooseImageCorrect,
			  }
			: oldKatakanaStat;
	const newStat: KanaStat = {
		hiraganaStat,
		katakanaStat,
	};
	parsedUserStats[index] = newStat;

	localStorage.setItem("userStats", JSON.stringify(parsedUserStats));
};
