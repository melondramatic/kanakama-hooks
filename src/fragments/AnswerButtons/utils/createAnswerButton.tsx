import React, { ReactElement } from 'react';

import { Kana, KanaType, PracticeMode } from '../../../constants';
import AnswerButtonCharacter from '../AnswerButtonCharacter';
import AnswerButtonReading from '../AnswerButtonReading';

const createAnswerButton = (
	practiceMode: PracticeMode,
	index: number,
	onClick: Function,
	showNext: boolean,
	optionKana: Kana,
	kanaSelection: KanaType,
	className: string,
	icon: ReactElement
) => {
	switch (practiceMode) {
		case PracticeMode.ChooseReading:
			return (
				<AnswerButtonReading
					id={`answer-button-${index}`}
					key={index}
					index={index}
					onClick={() => onClick()}
					classNames={className}
					disabled={showNext}
					optionKana={optionKana}
					icon={icon}
				/>
			);

		case PracticeMode.ChooseCharacter:
			return (
				<AnswerButtonCharacter
					id={`answer-button-${index}`}
					key={index}
					index={index}
					onClick={() => onClick()}
					classNames={className}
					disabled={showNext}
					optionKana={optionKana}
					icon={icon}
					kanaSelection={kanaSelection}
				/>
			);

		default:
			break;
	}
};

export default createAnswerButton;
