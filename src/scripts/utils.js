const generateRandomNumbers = (max, count) => {
  if (max <= count) {
    return Array.from({ length: max + 1 }, (_, i) => i);
  }

  const randomNumbers = [];

  while (randomNumbers.length < count) {
    let randomNumber = Math.floor(Math.random() * (max + 1));
    !randomNumbers.includes(randomNumber)
      ? randomNumbers.push(randomNumber)
      : null;
  }

  return randomNumbers;
};

export const getRandomPeopleList = (peopleList, count) => {
  const randomNumbers = generateRandomNumbers(peopleList.length, count);
  return peopleList.filter((_, i) => randomNumbers.includes(i));
};
