import { getRefs } from './getRefs';
const { countryList } = getRefs();

export function renderCountryList(data) {
  countryList.innerHTML = data
    .map(({ name, flags }) => {
      return `
          <li class="card-item">
            <img class="card-item-img" src="${flags.svg}" alt="${name.official}" />
            <p class="card-item-text">${name.common}</p>
          </li>
            `;
    })
    .join('');
}
