import renderer, { act } from 'react-test-renderer';

import AddCategoryScreen from '../screens/AddCategoryScreen';
import React from 'react';

describe('<AddCategoryScreen />', () => {
  it('renders AddCategoryScreen', async () => {
    jest.useFakeTimers();
    let tree;

    await act(async () => {
      tree = renderer.create(<AddCategoryScreen route={{ params: {} }}/>);
    });         
    tree = tree.toJSON();

    expect(tree.children.length).toBe(1);
  });
});