const gridTable = document.querySelector('.grid-table');

export const renderGridTable = (peopleList) => {
  console.log(peopleList);
  if (!peopleList || !Array.isArray(peopleList)) return;

  gridTable.innerHTML = `
    <div class="grid-header">Character Name</div>
    <div class="grid-header">Gender</div>
    <div class="grid-header">Birth Year</div>
    <div class="grid-header">Home World</div>
  `;

  peopleList.forEach(({ id, name, gender, birth_year, planetInfo }) => {
    const characterData = `
    <div class="grid-cell">${name}</div>
    <div class="grid-cell">${gender}</div>
    <div class="grid-cell">${birth_year}</div>
  `;

    const planetData =
      planetInfo.name === 'unknown'
        ? `
    <div class="grid-cell">${planetInfo.name}</div>
  `
        : `
    <div class="grid-cell">
      ${planetInfo.name}
      <div class="arrow" data-id="${id}">
      </div>
    </div>
  `;

    gridTable.insertAdjacentHTML('beforeend', characterData + planetData);
  });
};

export const renderPopover = (person) => {
  const popover = document.createElement('div');
  popover.classList.add('popover-content');
  popover.innerHTML = `
    <h4>${person.planetInfo.name}</h4>
    <ul>
      <li><strong>Climate:</strong> ${person.planetInfo.climate}</li>
      <li><strong>Terrain:</strong> ${person.planetInfo.terrain}</li>
      <li><strong>Population:</strong> ${person.planetInfo.population}</li>
    </ul>
  `;
  document.body.appendChild(popover);
  return popover;
};
