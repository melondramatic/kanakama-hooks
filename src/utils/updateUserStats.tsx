import { KanaType, KanaStat, PracticeMode } from '../constants';

export const updateUserStats = (
	index: number,
	kanaSelection: KanaType,
	practiceMode: PracticeMode,
	isCorrect: boolean
) => {
	const userStats = localStorage.getItem('userStats');

	if (userStats === null) return;

	const parsedUserStats: KanaStat[] = JSON.parse(userStats);
	const oldStat = parsedUserStats[index];
	const oldHiraganaStat = oldStat.hiraganaStat;
	const oldKatakanaStat = oldStat.katakanaStat;
	const hiraganaStat =
		kanaSelection === KanaType.Hiragana
			? {
					chooseReadingOcurrences:
						practiceMode === PracticeMode.ChooseReading
							? oldHiraganaStat.chooseReadingOcurrences + 1
							: oldHiraganaStat.chooseReadingOcurrences,
					chooseReadingCorrect:
						practiceMode === PracticeMode.ChooseReading && isCorrect
							? oldHiraganaStat.chooseReadingCorrect + 1
							: oldHiraganaStat.chooseReadingCorrect,
					chooseCharacterOcurrences:
						practiceMode === PracticeMode.ChooseCharacter
							? oldHiraganaStat.chooseCharacterOcurrences + 1
							: oldHiraganaStat.chooseCharacterOcurrences,
					chooseCharacterCorrect:
						practiceMode === PracticeMode.ChooseCharacter && isCorrect
							? oldHiraganaStat.chooseCharacterCorrect + 1
							: oldHiraganaStat.chooseCharacterCorrect,
			  }
			: oldHiraganaStat;

	const katakanaStat =
		kanaSelection === KanaType.Katakana
			? {
					chooseReadingOcurrences:
						practiceMode === PracticeMode.ChooseReading
							? oldKatakanaStat.chooseReadingOcurrences + 1
							: oldKatakanaStat.chooseReadingOcurrences,
					chooseReadingCorrect:
						practiceMode === PracticeMode.ChooseReading && isCorrect
							? oldKatakanaStat.chooseReadingCorrect + 1
							: oldKatakanaStat.chooseReadingCorrect,
					chooseCharacterOcurrences:
						practiceMode === PracticeMode.ChooseCharacter
							? oldKatakanaStat.chooseCharacterOcurrences + 1
							: oldKatakanaStat.chooseCharacterOcurrences,
					chooseCharacterCorrect:
						practiceMode === PracticeMode.ChooseCharacter && isCorrect
							? oldKatakanaStat.chooseCharacterCorrect + 1
							: oldKatakanaStat.chooseCharacterCorrect,
			  }
			: oldKatakanaStat;
	const newStat: KanaStat = {
		hiraganaStat,
		katakanaStat,
	};
	parsedUserStats[index] = newStat;

	localStorage.setItem('userStats', JSON.stringify(parsedUserStats));
};
