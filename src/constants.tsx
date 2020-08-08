export enum Pages {
	MainPage,
	PracticeSelectionPage,
	StatsPage,
}

export enum KanaType {
	Unselected,
	Hiragana,
	Katakana,
	Both,
}

export enum PracticeMode {
	Unselected,
	ChooseSound,
	ChooseImage,
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
	chooseSoundOcurrences: number;
	chooseSoundCorrect: number;
	chooseImageOcurrences: number;
	chooseImageCorrect: number;
}
