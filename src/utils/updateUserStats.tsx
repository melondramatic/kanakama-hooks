import {
	KanaType,
	KanaStat,
	PracticeMode,
	LocalStorage,
	UpdateListStat,
} from '../constants';

export const updateUserStats = () => {
	const userStats = localStorage.getItem(LocalStorage.UserStats);
	const updateList = localStorage.getItem(LocalStorage.UpdateList);
	if (userStats === null || updateList === null) return null;

	const parsedUserStats: KanaStat[] = JSON.parse(userStats);
	const parsedUpdateList: UpdateListStat[] = JSON.parse(updateList);

	parsedUpdateList.forEach((stat) => {
		const { index, kanaSelection, practiceMode, isCorrect } = stat;

		const oldStat = parsedUserStats[index];
		const oldHiraganaStat = oldStat.hiraganaStat;
		const oldKatakanaStat = oldStat.katakanaStat;
		const hiraganaStat =
			kanaSelection === KanaType.Hiragana
				? {
						chooseReadingOccurrences:
							practiceMode === PracticeMode.ChooseReading
								? oldHiraganaStat.chooseReadingOccurrences + 1
								: oldHiraganaStat.chooseReadingOccurrences,
						chooseReadingCorrect:
							practiceMode === PracticeMode.ChooseReading && isCorrect
								? oldHiraganaStat.chooseReadingCorrect + 1
								: oldHiraganaStat.chooseReadingCorrect,
						chooseCharacterOccurrences:
							practiceMode === PracticeMode.ChooseCharacter
								? oldHiraganaStat.chooseCharacterOccurrences + 1
								: oldHiraganaStat.chooseCharacterOccurrences,
						chooseCharacterCorrect:
							practiceMode === PracticeMode.ChooseCharacter && isCorrect
								? oldHiraganaStat.chooseCharacterCorrect + 1
								: oldHiraganaStat.chooseCharacterCorrect,
				  }
				: oldHiraganaStat;

		const katakanaStat =
			kanaSelection === KanaType.Katakana
				? {
						chooseReadingOccurrences:
							practiceMode === PracticeMode.ChooseReading
								? oldKatakanaStat.chooseReadingOccurrences + 1
								: oldKatakanaStat.chooseReadingOccurrences,
						chooseReadingCorrect:
							practiceMode === PracticeMode.ChooseReading && isCorrect
								? oldKatakanaStat.chooseReadingCorrect + 1
								: oldKatakanaStat.chooseReadingCorrect,
						chooseCharacterOccurrences:
							practiceMode === PracticeMode.ChooseCharacter
								? oldKatakanaStat.chooseCharacterOccurrences + 1
								: oldKatakanaStat.chooseCharacterOccurrences,
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
	});

	const updatedStats = JSON.stringify(parsedUserStats);
	localStorage.setItem(LocalStorage.UserStats, updatedStats);
	localStorage.removeItem(LocalStorage.UpdateList);
	return updatedStats;
};
