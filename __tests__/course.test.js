import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Course from '../components/Course';
import CategoryContext from '../CategoryContext';
import templates from '../templates';
import App from '../App';

const props = {
    subject:'CS',
    number: '340',
    title: 'Networking',
    index: 5,
    moveCourse: () => {
    },
    categoryId: 6,
}

describe('<Course/>', () => {
  it('has includes text: CS 340', async () => {
    jest.useFakeTimers();
    let tree;

    await act(async () => {
      tree = renderer.create(
        <CategoryContext.Provider
          value={{ categories: templates[0].categories }}
        >
          <Course {...props} />
        </CategoryContext.Provider>
      );
    });
    tree = tree.toJSON();

    expect(JSON.stringify(tree).indexOf('CS 340')).toBeGreaterThan(-1);
  });
});
