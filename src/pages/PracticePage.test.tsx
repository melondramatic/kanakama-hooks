import { render } from '@testing-library/react';
import React from 'react';

import { KanaType, PracticeMode } from '../constants';
import PracticePage from './PracticePage';

describe('PracticePage', () => {
	beforeAll(() => {
		Object.defineProperty(window, 'localStorage', {
			value: {
				getItem: () => {
					return '[]';
				},
				setItem: () => {},
			},
		});
	});

	it('renders a question and 1 answer button', () => {
		const practicePage = render(
			<PracticePage
				kanaSelection={KanaType.Hiragana}
				practiceMode={PracticeMode.ChooseCharacter}
				optionCount={1}
			/>
		);

		expect(practicePage.queryAllByRole('button').length).toBe(1);
	});

	it('increments the correct counter when the correct answer is selected', () => {
		const practicePage = render(
			<PracticePage
				kanaSelection={KanaType.Hiragana}
				practiceMode={PracticeMode.ChooseCharacter}
				optionCount={1}
			/>
		);

		practicePage.getByRole('button').click();
		expect(practicePage.queryByText('1')).toBeTruthy();
		practicePage.getByRole('button').click();
		expect(practicePage.queryByText('2')).toBeTruthy();
	});

	it('renders many answer buttons', () => {
		const practicePage = render(
			<PracticePage
				kanaSelection={KanaType.Hiragana}
				practiceMode={PracticeMode.ChooseCharacter}
				optionCount={7}
			/>
		);

		expect(practicePage.queryAllByRole('button').length).toBe(7);
	});
});
