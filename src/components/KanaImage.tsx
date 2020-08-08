import React from "react";
import { KanaType, Kana } from "../constants";

interface Props {
	kanaSelection: KanaType;
	optionKana: Kana;
	className: string;
}

const KanaImage = ({ kanaSelection, optionKana, className }: Props) => {
	return (
		<img
			src={require(`../images/${
				kanaSelection === KanaType.Hiragana
					? optionKana.hiraganaPath
					: optionKana.katakanaPath
			}`)}
			className={className}
		/>
	);
};

export default KanaImage;
