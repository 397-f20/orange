import Fuse from 'fuse.js';

export const getFuse = (array) => {
  // defining options arguments for the Fuse Search
  const options = {
    keys: ['name', 'title'],
    threshold: 0.3,
    shouldSort: true,
  };

  // defining the fuse search
  const fuse = new Fuse(array, options);
  return fuse;
};
