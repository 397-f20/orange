import renderer, { act } from 'react-test-renderer';

import HomeScreen from '../screens/HomeScreen';
import React from 'react';
import templates from '../templates';
import CategoryContext from '../CategoryContext';

describe('<HomeScreen />', () => {
  it('Homescreen has 1 child', async () => {
    jest.useFakeTimers();
    let tree;

    await act(async () => {
      tree = renderer.create(
        <CategoryContext.Provider
          value={{
            categories: templates[0].categories,
            setCurrentCategories: jest.fn(),
          }}
        >
          <HomeScreen route={{ params: { template: templates[0] } }} />
        </CategoryContext.Provider>
      );
    });
    tree = tree.toJSON();

    expect(tree.length).toBe(2);
  });
});
