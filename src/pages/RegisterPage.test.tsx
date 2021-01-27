import React from 'react';
import sinon from 'sinon';
import RegisterPage from './RegisterPage';
import { fireEvent, render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as AxiosCalls from '../utils/axiosCalls';
import { strings } from '../strings';

describe('RegisterPage', () => {
	afterEach(() => {
		sinon.reset();
		sinon.restore();
	});

	it('renders fields for user data', () => {
		const registerPage = render(<RegisterPage />);
		expect(registerPage.queryByLabelText(`${strings.username} *`)).toBeTruthy();
		expect(registerPage.queryByLabelText(`${strings.password} *`)).toBeTruthy();
		expect(registerPage.queryByLabelText(strings.email)).toBeTruthy();
	});

	it('displays an error message if an error is returned from submission', async () => {
		let promise = Promise.reject({
			response: { data: { error: ['one bad'] } },
		});
		let postStub = sinon.stub(AxiosCalls, 'CreateUser').returns(promise);

		const registerPage = render(<RegisterPage />);
		userEvent.type(
			registerPage.getByLabelText(`${strings.username} *`),
			'testUser'
		);
		userEvent.type(
			registerPage.getByLabelText(`${strings.password} *`),
			'testPassword'
		);

		fireEvent.submit(registerPage.getByText(strings.button_register));

		expect(postStub.calledOnce).toBe(true);

		// need to catch promise.reject
		try {
			await act(() => promise);
		} catch {
			expect(registerPage.getByText(`${strings.error_register}:`)).toBeTruthy();
			expect(registerPage.getByText('one bad')).toBeTruthy();
		}
	});
});
