import { render } from '@testing-library/react';
import React from 'react';
import { KanaType } from '../../constants';
import { strings } from '../../strings';

import StatsSummary from './StatsSummary';

describe('StatsSummary', () => {
	const props = {
		kanaType: KanaType.Hiragana,
		setDetailKanaData: () => {},
		stats: JSON.stringify([
			{
				hiraganaStat: {
					chooseReadingOccurrences: 0,
					chooseReadingCorrect: 0,
					chooseCharacterOccurrences: 0,
					chooseCharacterCorrect: 0,
				},
				katakanaStat: {
					chooseReadingOccurrences: 0,
					chooseReadingCorrect: 0,
					chooseCharacterOccurrences: 0,
					chooseCharacterCorrect: 0,
				},
			},
		]),
	};

	it('initially renders as collapsed', () => {
		const statsSummary = render(<StatsSummary {...props} />);
		expect(
			statsSummary.queryByText(`${strings.stats_timesSeen}: 0`)
		).toBeFalsy();
	});

	it('expands on click', () => {
		const statsSummary = render(<StatsSummary {...props} />);

		expect(
			statsSummary.queryByText(`${strings.stats_timesSeen}: 0`)
		).toBeFalsy();
		statsSummary.getByText(strings.stats_hiraganaStats).click();
		expect(
			statsSummary.queryByText(`${strings.stats_timesSeen}: 0`)
		).toBeTruthy();
	});
});
