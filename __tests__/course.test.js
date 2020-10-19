import React from 'react';
import renderer from 'react-test-renderer';
import Course from '../components/Course';
import CategoryContext from "../CategoryContext";
import templates from "../templates";

const props = {
    number: '340',
    title: 'Networking',
    index: 5,
    moveCourse: () => {},
    categoryId: 6,
}

describe('<Course/>', () => {
    it('has includes text: CS 340', async () => {
        jest.useFakeTimers();
        const tree = renderer.create(
            <CategoryContext.Provider value={templates[0].categories}>
                <Course {...props} />
            </CategoryContext.Provider>).toJSON();
        expect(JSON.stringify(tree).indexOf("CS 340")).toBeGreaterThan(-1);
    });
});
