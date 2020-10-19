import React from 'react';
import renderer, {act} from 'react-test-renderer';
import App from '../App';


describe('<App />', async () => {
    jest.useFakeTimers();
    it('has 1 child', async () => {
        let tree;
        await act(async () => {
            tree = renderer.create(<App/>)
        });
        tree = tree.toJSON()
        expect(tree.children.length).toBe(1);
    })
});
