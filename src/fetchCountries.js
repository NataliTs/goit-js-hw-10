export const getData = name => {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,flags,capital,population,languages`
  ).then(res => {
    if (!res.ok) {
      if (res.status === 404) {
        return [];
      }
      throw new Error(res.status);
    }
    return res.json();
  });
};
