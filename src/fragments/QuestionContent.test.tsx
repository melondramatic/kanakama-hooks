import { render } from '@testing-library/react';
import React from 'react';
import { KanaType, PracticeMode } from '../constants';
import { strings } from '../strings';

import QuestionContent from './QuestionContent';

describe('QuestionContent', () => {
	const props = {
		kanaSelection: KanaType.Hiragana,
		correctIndex: 0,
		options: new Set([1, 2]),
	};

	it('returns a character question', () => {
		const questionContent = render(
			<QuestionContent {...props} practiceMode={PracticeMode.ChooseCharacter} />
		);
		expect(
			questionContent.queryByText(strings.question_character)
		).toBeTruthy();
	});

	it('returns a reading question', () => {
		const questionContent = render(
			<QuestionContent {...props} practiceMode={PracticeMode.ChooseReading} />
		);
		expect(questionContent.queryByText(strings.question_reading)).toBeTruthy();
	});
});
