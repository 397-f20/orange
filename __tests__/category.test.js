import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Category from '../components/Category';
import CategoryContext from '../CategoryContext';
import { mockCourses } from '../mockCourses';
import templates from '../templates';

const props = {
  name: 'Unallocated',
  total: null,
  addedCourses: mockCourses.slice(0, 15),
  moveCourse: () => {},
};

describe('<Category/>', () => {
  it('renders unallocated courses category', async () => {
    jest.useFakeTimers();
    let tree;

    await act(async () => {
      tree = renderer.create(
        <CategoryContext.Provider
          value={{ categories: templates[0].categories }}
        >
          <Category {...props} />
        </CategoryContext.Provider>
      );
    });
    tree = tree.toJSON();

    expect(JSON.stringify(tree).indexOf('Unallocated')).toBeGreaterThan(-1);
  });
});
