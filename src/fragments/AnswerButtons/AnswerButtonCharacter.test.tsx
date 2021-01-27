import { render } from '@testing-library/react';
import React from 'react';
import sinon from 'sinon';
import { KanaType } from '../../constants';

import AnswerButtonCharacter from './AnswerButtonCharacter';

describe('AnswerButtonCharacter', () => {
	const props = {
		id: 'test',
		index: 0,
		onClick: () => {},
		classNames: '',
		disabled: false,
		optionKana: {
			hiraganaPath: 'hiragana-a.svg',
			katakanaPath: '',
			name: '',
			family: '',
		},
		icon: <div data-testid={'testIcon'} />,
		kanaSelection: KanaType.Hiragana,
	};

	it('triggers the onClick when clicked', () => {
		const clickSpy = sinon.spy();
		const answerButton = render(
			<AnswerButtonCharacter {...props} onClick={clickSpy} />
		);
		answerButton.getByRole('button').click();
		expect(clickSpy.calledOnce).toBe(true);
	});

	it('does not trigger the onClick when the button is disabled', () => {
		const clickSpy = sinon.spy();
		const answerButton = render(
			<AnswerButtonCharacter {...props} onClick={clickSpy} disabled={true} />
		);
		answerButton.getByRole('button').click();
		expect(clickSpy.calledOnce).toBe(false);
	});

	it('displays the icon when the button is disabled', () => {
		const answerButton = render(
			<AnswerButtonCharacter {...props} disabled={true} />
		);
		expect(answerButton.queryByTestId('testIcon')).toBeTruthy();
	});

	it('does not display the icon when the button is enabled', () => {
		const answerButton = render(<AnswerButtonCharacter {...props} />);
		expect(answerButton.queryByTestId('testIcon')).toBeNull();
	});
});
