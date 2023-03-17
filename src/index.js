import './css/styles.css';
import debounce from 'lodash.debounce';
import { getData } from './fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

let searchName = '';
let countries = [];

const refs = {
  searchCountry: document.querySelector('#search-box'),
  listCountry: document.querySelector('.country-list'),
  infoCountry: document.querySelector('.country-info'),
};

const renderInfoCountry = () => {
  const infoCountry = countries
    .map(
      country => `<li>
      <div class="country"><img src="${country.flags.svg}" alt="${
        country.flags.alt
      }" width="40" height="30"/>
      <p><b>${country.name.official}</b></p></div>
      <p><b>Capital:</b> ${country.capital}</p>
      <p><b>Population:</b> ${country.population}</p>
      <p><b>Languages:</b> ${Object.values(country.languages)}</p>
      </li>`
    )
    .join('');

  refs.infoCountry.innerHTML = '';
  refs.infoCountry.insertAdjacentHTML('beforeend', infoCountry);
};

const renderListCountry = () => {
  const listCountry = countries
    .map(
      country => `<li><div class="country"><img src="${country.flags.svg}" alt="${country.flags.alt}" width="30" height="20"/>
      <p>${country.name.official}</p></div></li>`
    )
    .join('');

  refs.listCountry.insertAdjacentHTML('beforeend', listCountry);
};

const fetchCountries = () => {
  getData(searchName)
    .then(data => {
      countries = data;
      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length === 0) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      } else if (countries.length >= 2 && countries.length <= 10) {
        renderListCountry();
      } else if (countries.length === 1) {
        renderInfoCountry();
      }
      console.log(data);
    })
    .catch(error => console.log('error:', error));
};

const onInputSearch = e => {
  searchName = refs.searchCountry.value.trim();

  if (searchName !== '') {
    fetchCountries(searchName);
    console.log(searchName);
  }
};

refs.searchCountry.addEventListener(
  'input',
  debounce(e => {
    clearHTML();
    onInputSearch();
  }, DEBOUNCE_DELAY)
);

const clearHTML = () => {
  refs.infoCountry.innerHTML = '';
  refs.listCountry.innerHTML = '';
};
