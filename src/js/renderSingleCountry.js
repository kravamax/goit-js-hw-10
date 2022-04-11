import { getRefs } from './getRefs';
const { countryInfo } = getRefs();

export function renderSingleCountry(data) {
  const languagesList = Object.values(data[0].languages).join(', ');
  const populationWithSpaces = data[0].population.toLocaleString().replaceAll(',', ' ');

  countryInfo.innerHTML = data
    .map(({ name, capital, flags, languages }) => {
      return `
        <div class="card">
        <div class="card-header">
            <img class="card-header-img" src="${flags.svg}" alt="${name.official}" />
            <p class="card-header-text">${name.common}</p>
        </div>
        <div class="card-body">
            <p class="card-body-text"><span class="card-body-text-style">Capital:</span> ${capital}</p>
            <p class="card-body-text"><span class="card-body-text-style">Population:</span> ${populationWithSpaces}</p>
            <p class="card-body-text"><span class="card-body-text-style">Languages:</span> ${languagesList}</p>
        </div>
    </div>
    `;
    })
    .join('');
}
