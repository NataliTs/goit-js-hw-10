import './css/styles.css';
import debounce from 'lodash.debounce';
import { getData } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

let searchName = '';
let countries = [];

const refs = {
  searchCountry: document.querySelector('#search-box'),
  listCountry: document.querySelector('.country-list'),
  infoCountry: document.querySelector('.country-info'),
};

const renderinfoCountry = () => {
  const infoCountry = countries
    .map(
      country => `<li><img src="${country.flags.svg}" alt="${
        country.flags.alt
      }" width="30" height="20"/>
      <p>${country.name.official}</p>
      <p><b>Capital</b>${country.capital}</p>
      <p><b>Population</b>${country.population}</p>
      <p><b>Languages</b>${Object.values(country.languages)}</p>
      </li>`
    )
    .join('');

  refs.infoCountry.innerHTML = '';
  refs.infoCountry.insertAdjacentHTML('beforeend', infoCountry);
};

const renderListCountry = () => {
  const listCountry = countries
    .map(
      country => `<li><img src="${country.flags.svg}" alt="${country.flags.alt}" width="30" height="20"/>
      <p>${country.name.official}</p></li>`
    )
    .join('');

  refs.listCountry.innerHTML = '';
  refs.listCountry.insertAdjacentHTML('beforeend', listCountry);
};

const fetchCountries = () => {
  getData(searchName)
    .then(data => {
      countries = data;
      renderListCountry();
      console.log(data);
    })
    .catch(error => console.log('error:', error));
};

const onInputSearch = e => {
  searchName = refs.searchCountry.value.trim();
  console.log(searchName);
  fetchCountries(searchName);
};

refs.searchCountry.addEventListener(
  'input',
  debounce(() => {
    onInputSearch();
  }, DEBOUNCE_DELAY)
);
