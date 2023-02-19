import axios from 'axios';

async function fetchImages() {
  const BASE_URL = 'https://api.nytimes.com/svc/archive/v1/2019/1.json';

  // const searchParams = new URLSearchParams({
  //   key: `33272220-12aa76911a3763f30e85ef70a`,
  //   image_type: 'photo',
  //   orientation: 'horizontal',
  //   safesearch: true,
  //   per_page: 40,
  // });
  return await axios
    .get(`${BASE_URL}?api-key=Duf7eHj3BtrNXCoOTAhsOqQauuA7TrSU`)
    .then(response => {
      return response.data;
    })
    .catch(error => messageError(error));
}
