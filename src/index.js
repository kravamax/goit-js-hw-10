import throttle from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchCountries } from './js/helpers/fetchCountries';
import { getRefs } from './js/getRefs';
const { searchBox } = getRefs();
import { cleanInterface } from './js/helpers/cleanInterface';
import { renderCountryList } from './js/renderCountryList';
import { renderSingleCountry } from './js/renderSingleCountry';

import './css/styles.css';

const DEBOUNCE_DELAY = 300;

searchBox.addEventListener('input', throttle(searchOutput, DEBOUNCE_DELAY));

function searchOutput() {
  const search = searchBox.value.trim();

  if (!search) {
    cleanInterface();
    return;
  }

  fetchCountries(search).then(filterCountryList).catch(console.log);
}

function filterCountryList(data) {
  cleanInterface();

  if (data.length === 1) {
    renderSingleCountry(data);
  } else if (data.length > 1 && data.length <= 10) {
    renderCountryList(data);
  } else if (data.length > 10) {
    return Notify.info('Too many matches found. Please enter a more specific name.');
  }
}
