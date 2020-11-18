import { createContext } from 'react';

const CategoryContext = createContext({setCurrentCategories: () => {}, planName: '', categories: []});

export default CategoryContext;
