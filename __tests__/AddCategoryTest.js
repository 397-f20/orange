import React from 'react';
import { render, fireEvent, update } from '@testing-library/react-native';
import AddCategoryScreen from '../screens/AddCategoryScreen';
import renderer, { act } from "react-test-renderer";

const addCategory = (newCategory) => {
  return 0
}

describe('<AddCategoryScreen/>', () => {
  it('Allows adding a new category', async () => {
    jest.useFakeTimers();
    let tree = render(
        <AddCategoryScreen route={{ params: { addCategory: addCategory }}} />
      );
    const total = tree.getByPlaceholderText('1');
    const categoryName = tree.getByPlaceholderText('Untitled');
    fireEvent.changeText(total, '5');
    fireEvent.changeText(categoryName, 'Masters Core');
    tree.update(<AddCategoryScreen/>);
    expect(JSON.stringify(tree.toJSON()).indexOf('Masters Core')).toBeGreaterThan(0);
    expect(JSON.stringify(tree.toJSON()).indexOf('5')).toBeGreaterThan(0);
  });
});
