import React from 'react';
import renderer from 'react-test-renderer';
import Course from '../components/Course';
import CategoryContext from "../CategoryContext";
import templates from "../templates";

jest.useFakeTimers()

const props = {
    number: '340',
    title: 'Networking',
    index: 5,
    moveCourse: () => {},
    categoryId: 6,
}

const categories = {}

describe('<Course/>', () => {
    jest.useFakeTimers();
    it('has includes text: CS 340', () => {
        const tree = renderer.create(
            <CategoryContext.Provider value={templates[0].categories}>
                <Course {...props} />
            </CategoryContext.Provider>).toJSON();
        expect(JSON.stringify(tree).indexOf("CS 340")).toBeGreaterThan(-1);
    });
});
