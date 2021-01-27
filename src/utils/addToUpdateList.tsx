import {
	KanaType,
	LocalStorage,
	PracticeMode,
	UpdateListStat,
} from '../constants';

export const addToUpdateList = (
	index: number,
	kanaSelection: KanaType,
	practiceMode: PracticeMode,
	isCorrect: boolean
) => {
	const updateList = localStorage.getItem(LocalStorage.UpdateList);
	const parsedList =
		updateList === null ? [] : (JSON.parse(updateList) as UpdateListStat[]);
	parsedList.push({
		index,
		kanaSelection,
		practiceMode,
		isCorrect,
	});
	localStorage.setItem(LocalStorage.UpdateList, JSON.stringify(parsedList));
};
