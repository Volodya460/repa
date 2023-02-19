import axios from 'axios';
const LOCALSTORAGE_KEY = 'ID-SAVE';
const idArray = localStorage.getItem('ID-SAVE');
const idArrayPars = JSON.parse(idArray);
const listNews = document.querySelector('.list-news');
// newsId = idArrayPars[idArrayPars.length - 1].id + 1;

listNews.addEventListener('change', deletNews);

markUpNewsPopular(idArrayPars);
buttonClass();

function buttonClass() {
  let but = document.querySelectorAll('.js-button');
  let label = document.querySelectorAll('lable');

  but.forEach(el => {
    el.setAttribute('checked', 'true');
    el.classList.add('add');
  });

  label.forEach(el => {
    el.innerHTML = 'RemoveFromFavorite';
  });
}

function markUpNewsPopular(arr) {
  const markUp = arr
    .map(
      ({ url, media, title, abstract, published_date, add }, id = newsId) => {
        let dateUser = new Date(published_date);
        let date = dateUser.toLocaleDateString();
        return `<div class="set">
                <div class="thumb">
                <img class="img-news" src="${''}" alt="" width="288"
                onerror= src="https://timenews.in.ua/wp-content/uploads/2017/07/News.jpg">
                </div>
                <h2 class="title">${title}</h2>
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
      }
    )
    .join('');

  listNews.insertAdjacentHTML('beforeend', markUp);
}

function deletNews(e) {
  if (!e.target.classList.contains('button')) {
    return;
  } else if (e.target.classList.contains('add')) {
    isChecket = e.target.checked;

    const findIndex = +idArrayPars.findIndex(
      el => el.id === +e.target.dataset.id
    );
    idArrayPars.splice(findIndex, 1);

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(idArrayPars));
    console.log(idArrayPars);
    e.target.parentNode.parentNode.parentNode.remove();
  }
}
