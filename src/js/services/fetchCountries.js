const URL = `https://restcountries.com/v3.1/name/`;

// export function fetchCountries(countryName) {
//   return fetch(`${URL}${countryName}/?fields=name,capital,population,flags,languages`).then(
//     response => {
//       if (!response.ok) {
//         console.log('Ошибка');
//         throw new Error(response.status);
//       }
//       return response.json();
//     },
//   );
// }

//  Тоже самое с использованием async await

export async function fetchCountries(countryName) {
  const response = await fetch(
    `${URL}${countryName}/?fields=name,capital,population,flags,languages`,
  );

  if (!response.ok) {
    console.log('Ошибка');
    throw new Error(response.status);
  }

  const countries = await response.json();

  return countries;
}
