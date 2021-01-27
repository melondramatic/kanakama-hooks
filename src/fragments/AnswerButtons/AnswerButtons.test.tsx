import { render } from '@testing-library/react';
import React from 'react';
import { KanaType, PracticeMode } from '../../constants';

import AnswerButtons from './AnswerButtons';

describe('AnswerButtons', () => {
	it('renders a given set of answer buttons', () => {
		const props = {
			practiceMode: PracticeMode.ChooseCharacter,
			options: new Set([1, 2]),
			correctIndex: 0,
			onCorrect: () => {},
			onIncorrect: () => {},
			kanaSelection: KanaType.Hiragana,
		};
		const answerButtons = render(<AnswerButtons {...props} />);
		expect(answerButtons.getAllByRole('button').length).toEqual(2);
	});
});
