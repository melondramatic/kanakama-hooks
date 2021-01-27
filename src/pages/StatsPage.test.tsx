import { render } from '@testing-library/react';
import React from 'react';
import sinon from 'sinon';
import { LocalStorage } from '../constants';

import { strings } from '../strings';
import StatsPage from './StatsPage';

describe('StatsPage', () => {
	const getStub = sinon.stub();

	beforeAll(() => {
		Object.defineProperty(window, 'localStorage', {
			value: {
				getItem: getStub,
			},
		});
	});

	afterEach(() => {
		sinon.reset();
	});

	it('displays a message telling the user they have no stat data', () => {
		const statsPage = render(<StatsPage data={null} />);
		expect(statsPage.queryByText(strings.stats_noStats)).toBeTruthy();
		expect(statsPage.queryByText(strings.button_practice)).toBeTruthy();
	});

	it('displays the stat summaries', () => {
		const statsPage = render(<StatsPage data={'[]'} />);
		expect(statsPage.queryByText(strings.stats_hiraganaStats)).toBeTruthy();
		expect(statsPage.queryByText(strings.stats_katakanaStats)).toBeTruthy();
	});

	it('displays the create account prompt if there is no logged in user', () => {
		getStub.returns(null);
		const statsPage = render(<StatsPage data={'[]'} />);
		expect(statsPage.queryByText(strings.stats_register)).toBeTruthy();
		expect(statsPage.queryByText(strings.button_register)).toBeTruthy();
	});

	it('does not display the create account prompt if there is a logged in user', () => {
		getStub.returns('user');
		const statsPage = render(<StatsPage data={'[]'} />);
		expect(statsPage.queryByText(strings.stats_register)).toBeFalsy();
		expect(statsPage.queryByText(strings.button_register)).toBeFalsy();
	});
});
