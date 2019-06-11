import React from 'react';

import {shallow} from 'enzyme';
import App from './';

describe('<App />', () => {
  it('should render correctly', () => {
    const wrap = shallow(<App/>);

    expect(wrap).toMatchSnapshot();
  });

  it('should update query', () => {
    const wrap = shallow(<App/>);
    const inputEl = wrap.find('input');
    const formEl = wrap.find('form');

    inputEl.simulate('change', {target: {value: 'abc'}, preventDefault: Function.prototype})
    formEl.simulate('submit', {preventDefault: Function.prototype});

    expect(wrap).toMatchSnapshot();
  });
});
