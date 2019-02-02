import { shallow } from 'enzyme';
import * as React from 'react';
import Header from '../components/Header';

it('Header renders without crashing', () => {
    const wrapper =
        shallow(
            <Header />
        );
    expect(wrapper).toMatchSnapshot();
});
