import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Category from '../components/Category';
import { mockCourses } from '../mockCourses';
import { DraxProvider } from 'react-native-drax';

const props = {
  name: 'Unallocated',
  total: null,
  addedCourses: mockCourses.slice(0, 15),
  futureCourses: [],
  moveCourse: () => {},
  removeCourse: () => {},
  index: 0,
};

describe('<Category/>', () => {
  it('renders unallocated courses category', async () => {
    jest.useFakeTimers();
    let tree;

    await act(async () => {
      tree = renderer.create(
        <DraxProvider>
          <Category {...props} />
        </DraxProvider>
      );
    });
    tree = tree.toJSON();

    expect(JSON.stringify(tree).indexOf('Unallocated')).toBeGreaterThan(-1);
  });
});
