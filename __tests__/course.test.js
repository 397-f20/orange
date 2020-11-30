import renderer, { act } from 'react-test-renderer';

import Course from '../components/Course';
import { DraxProvider } from 'react-native-drax';
import PlanContext from '../PlanContext';
import React from 'react';
import templates from '../templates';

const props = {
  subject: 'CS',
  number: '340',
  title: 'Networking',
  index: 5,
  moveCourse: () => {},
  categoryId: 6,
};

describe('<Course/>', () => {
  it('has includes text: CS 340', async () => {
    jest.useFakeTimers();
    let tree;

    await act(async () => {
      tree = renderer.create(
        <DraxProvider>
          <PlanContext.Provider value={{ currentPlan: templates[0].categories }}>
            <Course {...props} />
          </PlanContext.Provider>
        </DraxProvider>
      );
    });
    tree = tree.toJSON();

    expect(JSON.stringify(tree).indexOf('CS 340')).toBeGreaterThan(-1);
  });
});
