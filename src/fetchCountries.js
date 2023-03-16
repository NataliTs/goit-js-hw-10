export const getData = name => {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,flags,capital,population,languages`
  ).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('Failed to fetch');
  });
};
