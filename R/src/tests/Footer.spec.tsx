import { shallow } from 'enzyme';
import * as React from 'react';
import Footer from '../components/Footer';

it('Footer renders without crashing', () => {
    const wrapper =
        shallow(
            <Footer />
        );
    expect(wrapper).toMatchSnapshot();
});
