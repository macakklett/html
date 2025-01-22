import { getAllPeople, getPlanetInfo } from './gateways.js';
import { getRandomPeopleList } from './utils.js';
import { renderGridTable, renderPopover } from './renderTasks.js';

const gridTable = document.querySelector('.grid-table');
const searchInput = document.querySelector('#search-input');
const peopleWithPlanetsAndId = [];
const countForRender = 5;

const getAllPeopleWithPlanetsAndId = async (peopleList) => {
  try {
    const updatedPeopleList = await Promise.all(
      peopleList.map(async (human) => {
        const planetInfo = await getPlanetInfo(human.homeworld);
        const id = human.url.split('/').filter(Boolean).pop();
        return {
          ...human,
          id,
          planetInfo,
        };
      })
    );

    return updatedPeopleList;
  } catch (error) {
    console.error('Error processing people with planets and IDs:', error);
  }
};

const fetchAndGeneratePeople = async () => {
  try {
    const allPeople = await getAllPeople();
    const peopleWithPlanets = await getAllPeopleWithPlanetsAndId(allPeople);
    peopleWithPlanetsAndId.push(...peopleWithPlanets);

    const randomPeopleList = getRandomPeopleList(
      peopleWithPlanetsAndId,
      countForRender
    );

    renderGridTable(randomPeopleList);
  } catch (error) {
    console.error('Error fetching and generating people:', error);
  }
};

fetchAndGeneratePeople();

gridTable.addEventListener('click', (event) => {
  const target = event.target.closest('.arrow');

  if (!target) {
    document.querySelectorAll('.popover-content').forEach((popover) => {
      popover.remove();
    });
    return;
  }

  const personId = target.dataset.id;
  const person = peopleWithPlanetsAndId.find((p) => p.id === personId);
  if (!person) return;

  document.querySelectorAll('.popover-content').forEach((popover) => {
    popover.remove();
  });

  const popover = renderPopover(person);

  const rect = target.getBoundingClientRect();
  popover.style.position = 'absolute';
  popover.style.top = `${rect.bottom + window.scrollY}px`;
  popover.style.left = `${rect.left - rect.width * 4}px`;
});

searchInput.addEventListener('input', (event) => {
  const searchText = event.target.value.trim().toLowerCase();

  if (searchText === '') {
    const randomPeopleList = getRandomPeopleList(
      peopleWithPlanetsAndId,
      countForRender
    );
    renderGridTable(randomPeopleList);
    return;
  }

  const filteredList = peopleWithPlanetsAndId.filter((person) =>
    person.name.toLowerCase().includes(searchText)
  );

  renderGridTable(filteredList.slice(0, countForRender));
});
