import { fireEvent, render, update } from '@testing-library/react-native';
import renderer, { act } from 'react-test-renderer';

import AddCourseScreen from '../screens/AddCourseScreen';
import React from 'react';

describe('<AddCourseScreen />', () => {
  it('renders AddCourseScreen', async () => {
    jest.useFakeTimers();
    let tree;

    await act(async () => {
      tree = renderer.create(<AddCourseScreen />);
    });
    tree = tree.toJSON();

    expect(tree.children.length).toBe(1);
  });

  it('searches for Data Management course', async () => {
    jest.useFakeTimers();
    let tree;

    tree = render(<AddCourseScreen />);
    const searchbar = tree.getByPlaceholderText('Search Course');
    fireEvent.changeText(searchbar, 'management');
    tree.update(<AddCourseScreen />);

    expect(
      JSON.stringify(tree.toJSON()).indexOf(
        'Data management and information processing'
      )
    ).toBeGreaterThan(0);
  });
});
