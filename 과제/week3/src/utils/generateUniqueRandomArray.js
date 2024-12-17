const generateUniqueRandomArray = (min, max, length) => {
  const set = new Set();
  while (set.size < length) {
    set.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return Array.from(set);
};

export default generateUniqueRandomArray;
