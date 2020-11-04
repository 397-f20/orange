import { fireEvent, render, update } from '@testing-library/react-native';
import renderer, { act } from 'react-test-renderer';

import AddCourseScreen from '../screens/AddCourseScreen';
import CategoryContext from '../CategoryContext';
import React from 'react';
import templates from '../templates';

describe('<AddCourseScreen />', () => {
  it('renders AddCourseScreen', async () => {
    jest.useFakeTimers();
    let tree;

    await act(async () => {
      tree = renderer.create(
        <CategoryContext.Provider
          value={{ categories: templates[0].categories }}
        >
          <AddCourseScreen />
        </CategoryContext.Provider>
      );
    });
    tree = tree.toJSON();

    expect(tree.children.length).toBe(1);
  });

  it('searches for Data Management course', async () => {
    jest.useFakeTimers();
    let tree;

    const WithContextAddCourseScreen = () => (
      <CategoryContext.Provider value={{ categories: templates[0].categories }}>
        <AddCourseScreen />
      </CategoryContext.Provider>
    );

    tree = render(<WithContextAddCourseScreen />);
    const searchbar = tree.getByPlaceholderText('Search Course');
    fireEvent.changeText(searchbar, 'management');
    tree.update(<WithContextAddCourseScreen />);

    expect(
      JSON.stringify(tree.toJSON()).indexOf(
        'Data Management & Information Processing'
      )
    ).toBeGreaterThan(0);
  });
});
