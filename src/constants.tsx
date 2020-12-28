export enum Pages {
	MainPage,
	PracticeSelectionPage,
	StatsPage,
}

export enum KanaType {
	Unselected = "UNSELECTED",
	Hiragana = "HIRAGANA",
	Katakana = "KATAKNA",
	Both = "BOTH",
}

export enum PracticeMode {
	Unselected,
	ChooseReading,
	ChooseCharacter,
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
	chooseReadingOcurrences: number;
	chooseReadingCorrect: number;
	chooseCharacterOcurrences: number;
	chooseCharacterCorrect: number;
}
