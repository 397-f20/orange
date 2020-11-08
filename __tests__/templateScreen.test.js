import renderer, { act } from 'react-test-renderer';

import TemplateScreen from '../screens/TemplateScreen'
import React from 'react';

describe('<TemplateScreen />', () => {
  it('renders TemplateScreen', async () => {
    jest.useFakeTimers();
    let tree;

    await act(async () => {
      tree = renderer.create(<TemplateScreen />);
    });
    tree = tree.toJSON();

    expect(tree.type).toBe('RCTSafeAreaView');
  });
});