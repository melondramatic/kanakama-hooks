import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { strings } from '../strings';
import PracticeModePage from './PracticeModePage';

describe('PracticeModePage', () => {
	it('initially displays character set selection buttons', () => {
		const practiceModePage = render(<PracticeModePage />);

		expect(
			practiceModePage.queryByText(strings.practice_selectKana)
		).toBeTruthy();
		expect(
			practiceModePage.queryByText(strings.practice_hiragana)
		).toBeTruthy();
		expect(
			practiceModePage.queryByText(strings.practice_katakana)
		).toBeTruthy();
		expect(practiceModePage.queryByText(strings.practice_both)).toBeTruthy();
	});

	it('displays practice mode selection buttons after a character set is selected', () => {
		const practiceModePage = render(<PracticeModePage />);

		userEvent.click(practiceModePage.getByText(strings.practice_hiragana));

		expect(
			practiceModePage.queryByText(strings.practice_selectMode)
		).toBeTruthy();
		expect(practiceModePage.queryByText(strings.practice_reading)).toBeTruthy();
		expect(
			practiceModePage.queryByText(strings.practice_character)
		).toBeTruthy();
	});

	it('displays the PracticePage after a practice mode is selected', () => {
		const practiceModePage = render(<PracticeModePage />);

		practiceModePage.getByText(strings.practice_hiragana).click();
		practiceModePage.getByText(strings.practice_character).click();

		expect(practiceModePage.queryByTestId('practice-page')).toBeTruthy();
	});
});
