import { getRefs } from '../getRefs';
const { countryList, countryInfo } = getRefs();

export function cleanInterface() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
