import { render } from '@testing-library/react';
import React from 'react';
import sinon from 'sinon';
import { RoutingContext } from '../Routing';
import { strings } from '../strings';

import PageBase from './PageBase';

const renderPageBase = (props: Object, setCurrentPage: any) => {
	return render(
		<RoutingContext.Provider value={{ setCurrentPage: setCurrentPage }}>
			<PageBase {...props}>
				<div data-testid={'testChild'} />
			</PageBase>
		</RoutingContext.Provider>
	);
};

describe('PageBase', () => {
	it('renders children', () => {
		const clickSpy = sinon.spy();
		const pageBase = renderPageBase({}, clickSpy);
		expect(pageBase.queryByTestId('testChild')).toBeTruthy();
	});

	it('renders the home button and calls the onClick when clicked', () => {
		const clickSpy = sinon.spy();
		const pageBase = renderPageBase({}, clickSpy);
		const homeButton = pageBase.getByText(strings.button_mainPage);
		homeButton.click();
		expect(clickSpy.calledOnce).toBe(true);
	});

	it('renders additional header buttons when provided', () => {
		const clickSpy = sinon.spy();
		const props = {
			buttons: [
				<button key={'tb1'}>testButton1</button>,
				<button key={'tb2'}>testButton2</button>,
			],
		};
		const pageBase = renderPageBase(props, clickSpy);
		expect(pageBase.queryByText('testButton1')).toBeTruthy();
		expect(pageBase.queryByText('testButton2')).toBeTruthy();
	});
});
