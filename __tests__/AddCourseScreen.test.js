import renderer, { act } from 'react-test-renderer';

import AddCourseScreen from '../screens/AddCourseScreen';
import CategoryContext from '../CategoryContext';
import Course from '../components/Course';
import React from 'react';
import templates from '../templates';

describe('<AddCourseScreen />', () => {
  it('has includes text: CS 340', async () => {
    jest.useFakeTimers();
    let tree;

    await act(async () => {
      tree = renderer.create(<AddCourseScreen />);
    });
    tree = tree.toJSON();

    expect(tree.children.length).toBe(1);
  });
});
