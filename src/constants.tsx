export enum Pages {
	MainPage,
	PracticeSelectionPage,
	StatsPage,
	RegisterPage,
	SignInPage,
}

export const OPTION_COUNT = 3;

export enum KanaType {
	Unselected = 'UNSELECTED',
	Hiragana = 'HIRAGANA',
	Katakana = 'KATAKANA',
	Both = 'BOTH',
}

export enum PracticeMode {
	Unselected = 'UNSELECTED',
	ChooseReading = 'READING',
	ChooseCharacter = 'CHARACTER',
}

export enum LocalStorage {
	User = 'user',
	UpdateList = 'updateList',
	UserStats = 'userStats',
}

export interface Kana {
	hiraganaPath: string;
	katakanaPath: string;
	name: string;
	family: string;
}

export interface KanaStat {
	hiraganaStat: Stat;
	katakanaStat: Stat;
}

export interface Stat {
	chooseReadingOccurrences: number;
	chooseReadingCorrect: number;
	chooseCharacterOccurrences: number;
	chooseCharacterCorrect: number;
}

export interface DetailKanaData {
	index: number;
	isHiragana: boolean;
	stat: Stat;
}

export interface UpdateListStat {
	index: number;
	kanaSelection: KanaType;
	practiceMode: PracticeMode;
	isCorrect: boolean;
}
