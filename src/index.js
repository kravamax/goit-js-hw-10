import throttle from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchCountries } from './js/services/fetchCountries';
import { getRefs } from './js/getRefs';
const { searchBox, countryInfo } = getRefs();
import { cleanInterface } from './js/helpers/cleanInterface';
import { renderCountryList } from './js/renderCountryList';
import { renderSingleCountry } from './js/renderSingleCountry';

import './css/styles.css';

const DEBOUNCE_DELAY = 300;
let validOutput = false;

searchBox.addEventListener('input', throttle(searchOutput, DEBOUNCE_DELAY));
searchBox.addEventListener('keypress', event => {
  if (event.keyCode === 13 && validOutput) {
    event.preventDefault();

    searchBox.value = '';
    cleanInterface();
  }
});

function searchOutput() {
  const search = searchBox.value.trim();
  validOutput = false;

  if (!search) {
    cleanInterface();
    return;
  }

  fetchCountries(search)
    .then(filterCountryList)
    .catch(error => {
      console.error(error);
      cleanInterface();

      Notify.failure('Oops, there is no country with that name');
    });
}

function filterCountryList(data) {
  cleanInterface();

  if (data.length === 1) {
    validOutput = true;
    renderSingleCountry(data);
  } else if (data.length > 1 && data.length <= 10) {
    renderCountryList(data);
  } else if (data.length > 10) {
    return Notify.info('Too many matches found. Please enter a more specific name.');
  }
}
