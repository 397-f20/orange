import React from 'react';
import { render, fireEvent, update } from '@testing-library/react-native';
import AddCourseScreen from '../screens/AddCourseScreen';
import CategoryContext from "../CategoryContext";
import { mockCourses } from '../mockCourses';
import templates from "../templates";
import { Searchbar } from "react-native-paper";

describe('<AddCourseScreen/>', () => {
    it('Allows adding a course', async () => {
        jest.useFakeTimers();
        let tree = render(<AddCourseScreen/>)
        const searchbar = tree.getByPlaceholderText('Search Course');
        fireEvent.changeText(searchbar, '340');
        tree.update(<AddCourseScreen/>)
        expect(JSON.stringify(tree.toJSON()).indexOf('Networking')).toBeGreaterThan(0)
    });
});
