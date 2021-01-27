import { configure, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import sinon from 'sinon';
import { strings } from '../strings';
import TitlePageButtons from './TitlePageButtons';

describe('TitlePageButtons', () => {
	const getStub = sinon.stub();
	const removeSpy = sinon.spy();

	beforeAll(() => {
		Object.defineProperty(window, 'localStorage', {
			value: {
				getItem: getStub,
				removeItem: removeSpy,
			},
		});
	});

	afterEach(() => {
		sinon.reset();
	});

	it('displays practice and stats buttons', () => {
		const titlePageButtons = render(<TitlePageButtons />);

		expect(titlePageButtons.queryByText(strings.button_practice)).toBeTruthy();
		expect(titlePageButtons.queryByText(strings.button_stats)).toBeTruthy();
	});

	it('displays login and create account buttons if user is not signed in', () => {
		getStub.returns(null);

		const titlePageButtons = render(<TitlePageButtons />);
		expect(titlePageButtons.queryByText(strings.button_signIn)).toBeTruthy();
		expect(titlePageButtons.queryByText(strings.button_register)).toBeTruthy();
	});

	it('does not display login and create account buttons if user is signed in', () => {
		getStub.returns('user');

		const titlePageButtons = render(<TitlePageButtons />);
		expect(titlePageButtons.queryByText(strings.button_signIn)).toBeFalsy();
		expect(titlePageButtons.queryByText(strings.button_register)).toBeFalsy();
	});

	it('displays sign out button if user is signed in', () => {
		getStub.returns('user');

		const titlePageButtons = render(<TitlePageButtons />);
		expect(titlePageButtons.queryByText(strings.button_signOut)).toBeTruthy();
	});

	it('does not display sign out button if user is not signed in', () => {
		getStub.returns(null);

		const titlePageButtons = render(<TitlePageButtons />);
		expect(titlePageButtons.queryByText(strings.button_signOut)).toBeFalsy();
	});

	describe('dialog', () => {
		it('displays when the sign out button is clicked', () => {
			getStub.returns('user');

			const titlePageButtons = render(<TitlePageButtons />);
			userEvent.click(titlePageButtons.getByText(strings.button_signOut));

			expect(titlePageButtons.queryByText(strings.dialog_signOut)).toBeTruthy();
		});

		it('signs the user out when the sign out button is clicked', () => {
			configure({
				testIdAttribute: 'id',
			});

			getStub.returns('user');

			const titlePageButtons = render(<TitlePageButtons />);
			userEvent.click(titlePageButtons.getByText(strings.button_signOut));
			userEvent.click(titlePageButtons.getByTestId('left-dialog-button'));

			expect(removeSpy.calledOnce).toBe(true);
		});
	});
});
