import { cleanInterface } from './cleanInterface';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const URL = `https://restcountries.com/v3.1/name/`;

export function fetchCountries(countryName) {
  return fetch(`${URL}${countryName}/?fields=name,capital,population,flags,languages`).then(
    response => {
      if (!response.ok) {
        cleanInterface();

        Notify.failure('Oops, there is no country with that name');
        throw new Error(response.status);
      }

      return response.json();
    },
  );
}
