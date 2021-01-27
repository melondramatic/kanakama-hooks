import React from 'react';
import sinon from 'sinon';
import SignInPage from './SignInPage';
import { fireEvent, render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as AxiosCalls from '../utils/axiosCalls';
import { RoutingContext } from '../Routing';
import { strings } from '../strings';

describe('SignInPage', () => {
	const setSpy = sinon.spy();

	beforeAll(() => {
		Object.defineProperty(window, 'localStorage', {
			value: {
				setItem: setSpy,
			},
		});
	});

	afterEach(() => {
		sinon.reset();
		sinon.restore();
	});

	it('renders fields for user data', () => {
		const registerPage = render(<SignInPage />);
		expect(registerPage.queryByLabelText(`${strings.username} *`)).toBeTruthy();
		expect(registerPage.queryByLabelText(`${strings.password} *`)).toBeTruthy();
	});

	it('displays an error message if an error is returned from submission', async () => {
		let promise = Promise.reject({
			response: { data: { error: ['one bad'] } },
		});
		let postStub = sinon.stub(AxiosCalls, 'LogIn').returns(promise);

		const registerPage = render(<SignInPage />);
		userEvent.type(
			registerPage.getByLabelText(`${strings.username} *`),
			'testUser'
		);
		userEvent.type(
			registerPage.getByLabelText(`${strings.password} *`),
			'testPassword'
		);

		fireEvent.submit(registerPage.getByText(strings.button_signIn));

		expect(postStub.calledOnce).toBe(true);

		// need to catch promise.reject
		try {
			await act(() => promise);
		} catch {
			expect(
				registerPage.getByText(
					'We were unable to log you in due to the following error:'
				)
			).toBeTruthy();
			expect(registerPage.getByText('one bad')).toBeTruthy();
		}
	});

	it('calls setCurrentPage if the login data is valid', async () => {
		const routingSpy = sinon.spy();
		let promise = Promise.resolve({
			data: {},
			status: 200,
			statusText: 'OK',
			headers: {},
			config: {},
		});
		let postStub = sinon.stub(AxiosCalls, 'LogIn').returns(promise);

		const registerPage = render(
			<RoutingContext.Provider value={{ setCurrentPage: routingSpy }}>
				<SignInPage />
			</RoutingContext.Provider>
		);
		userEvent.type(
			registerPage.getByLabelText(`${strings.username} *`),
			'testUser'
		);
		userEvent.type(
			registerPage.getByLabelText(`${strings.password} *`),
			'testPassword'
		);

		fireEvent.submit(registerPage.getByText(strings.button_signIn));

		expect(postStub.calledOnce).toBe(true);

		await act(() =>
			promise.then(() => {
				expect(routingSpy.calledOnce).toBe(true);
			})
		);
	});
});
