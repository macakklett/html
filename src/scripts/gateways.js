const baseURL = 'https://swapi.info/api';

export const getAllPeople = async () => {
  try {
    const response = await fetch(`${baseURL}/people`);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching people:', error);
    throw error;
  }
};

export const getPlanetInfo = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching people:', error);
    throw error;
  }
};
