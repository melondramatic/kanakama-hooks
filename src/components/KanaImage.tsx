import React from 'react';
import { KanaType, Kana } from '../constants';

interface Props {
	kanaSelection: KanaType;
	optionKana: Kana;
	className: string;
}

const KanaImage = ({ kanaSelection, optionKana, className }: Props) => {
	const isHiragana = kanaSelection === KanaType.Hiragana;
	return (
		<img
			src={require(`../images/${
				isHiragana ? optionKana.hiraganaPath : optionKana.katakanaPath
			}`)}
			className={className}
			alt={optionKana.name}
		/>
	);
};

export default KanaImage;
