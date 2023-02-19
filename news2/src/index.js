// '2Q5D7fvynyshAi0a8Zmy3AdyyqPFqoa6';
const API_KEY_P = 'Duf7eHj3BtrNXCoOTAhsOqQauuA7TrSU';
const input = document.querySelector('input');
const form = document.querySelector('form');
const listNews = document.querySelector('.list-news');
// let isChecket = (indeterminate = true);

const LOCALSTORAGE_KEY = 'ID-SAVE';
let idArray = localStorage.getItem('ID-SAVE');
let idArrayPars = JSON.parse(idArray) || [];

let newsId = 0;
firstPage();

listNews.addEventListener('change', getNewsArray);
window.addEventListener('DOMContentLoaded', idDone);

function idDone() {
  if (idArrayPars.length === 0) {
    return;
  } else {
    newsId = idArrayPars[idArrayPars.length - 1].id + 1 || 0;
  }
}

function firstPage() {
  console.log('Hello');
  axios
    .get(
      `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY_P}`
    )
    .then(response => {
      markUpNewsPopular(response.data.results);

      console.log(
        idArrayPars.map(el => {
          let tit = el.title;
          listNews.querySelectorAll('.js-title').forEach(el => {
            if (tit === el.textContent) {
              listNews.querySelectorAll('.js-button').checked = true;
              let but = document.querySelectorAll('.js-button');
            }
          });
        })
      );
      console.log(listNews.querySelectorAll('.js-title'));
    })
    .catch(error => console.log('error'));
}

function markUpNewsPopular(arr) {
  const markUp = arr
    .map(({ url, media, title, abstract, published_date }, id = newsId) => {
      let dateUser = new Date(published_date);
      let date = dateUser.toLocaleDateString();

      return `<div class="set">
                <div class="thumb">
                <img class="img-news" src="${''}" alt="" width="288"
                onerror= src="https://timenews.in.ua/wp-content/uploads/2017/07/News.jpg">
                </div>
                <h2 class="title js-title">${title}</h2>
                <p class="text">${abstract}</p>
                <div class="wrapper">
                <p class="date">${date}</p>
                <a href="${url}" class="read" target="_blank" rel="noreferrer noopener">Read more</a>
                <div class="button_add">
                <lable сlass="lable">AddToFavorite</lable>
                <input type="checkbox"  class="button js-button"  data-id=${id}>
                </div>
               </div>
            </div>  `;
    })
    .join('');
  listNews.insertAdjacentHTML('beforeend', markUp);
}

function getNewsArray(e) {
  if (!e.target.classList.contains('button')) {
    return;
  } else if (e.target.classList.contains('add')) {
    deletNews(e);
  } else {
    addToFavorite(e);
  }
}
function deletNews(e) {
  isChecket = e.target.checked;
  console.log(isChecket);
  const findIndex = +idArrayPars.findIndex(
    el => el.id === +e.target.dataset.id
  );
  idArrayPars.splice(findIndex, 1);

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(idArrayPars));
  e.target.parentNode.childNodes[1].innerHTML = 'AddToFavorite';
  e.target.classList.remove('add');
}

function addToFavorite(e) {
  // isChecket = e.target.checked;

  let arrayFavorites = {
    date: e.target.parentNode.parentNode.childNodes[1].innerText,
    url: e.target.parentNode.parentNode.childNodes[3].attributes[0].value,
    title: e.target.parentNode.parentNode.parentNode.childNodes[3].innerText,
    abstract: e.target.parentNode.parentNode.parentNode.childNodes[5].innerText,
    id: newsId,
    // add: isChecket,
  };
  // // const findIndex = +idArrayPars.findIndex(
  // //   el => el.id === +e.target.dataset.id
  // );

  idArrayPars.push(arrayFavorites);
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(idArrayPars));
  e.target.classList.add('add');
  // e.target.parentNode.innerHTML = ``;
  e.target.parentNode.childNodes[1].innerHTML = 'RemoveFromFavorite';

  newsId += 1;
}

//
// form.addEventListener('submit', searchNewsfromApi);
// function searchNewsfromApi(event) {
//   event.preventDefault();
//   const name = input.value;
//   console.log(name);
//   const date = '2023-02-16';
//   axios
//     .get(
//       `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${name}&api-key=${API_KEY_P}&begin_date=${date}&end_date=${date}`
//     )
//     .then(response => {
//       markUpNews(response.data.response.docs);
//     });
// }
// function markUpNews(arr) {
//   console.log(arr);
//   const markUp = arr
//     .map(({ web_url, multimedia, headline, abstract, pub_date }) => {
//       let dateUser = new Date(pub_date);
//       let date = dateUser.toLocaleDateString();
//       console.log(multimedia);
//       let photo =
//         multimedia.length !== 0
//           ? `https://static01.nyt.com/${multimedia[1].url}`
//           : 'https://timenews.in.ua/wp-content/uploads/2017/07/News.jpg';
//       // console.log(photo);
//       return `<div class="set">
//                 <div class="thumb">
//                 <img class="img-news" src="${photo}" alt="" width="288"
//                 onerror= src="https://timenews.in.ua/wp-content/uploads/2017/07/News.jpg">
//                 </div>
//                 <h2 class="title">${headline.main}</h2>
//                 <p class="text">${abstract}</p>
//                 <div class="wrapper">
//                 <p class="date">${date}</p>
//                 <a href="${web_url}" class="read" target="_blank" rel="noreferrer noopener">Read more</a>
//                 <button class="button">ADD</button>
//                 </div>
//             </div>  `;
//     })
//     .join('');
//   listNews.innerHTML = `<div class="weather">Weather</div>`;
//   listNews.insertAdjacentHTML('beforeend', markUp);
