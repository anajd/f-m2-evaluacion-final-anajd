'use strict';

const searchInput = document.querySelector('.search__input');
const searchButton = document.querySelector('.search__button');
const resultList = document.querySelector('.result__list');
// const resultContainer = document.querySelector('.result__container');
const urlData = 'http://api.tvmaze.com/search/shows?q=nova';

// Al hacer click
// recogido en el input
// muestra el titulo y cartel
const fetchShows = url => {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].show.name);
        const containerShow = document.createElement('li');
        containerShow.classList.add('container__show');
        const titleShow = document.createElement('h2');
        titleShow.classList.add('title__show');
        const imageShow = document.createElement('img');
        imageShow.classList.add('image__show');
        imageShow.src = data[i].show.image.medium;
        imageShow.alt = data[i].show.name;

        const titleShowContent = document.createTextNode(data[i].show.name);

        titleShow.appendChild(titleShowContent);

        containerShow.appendChild(imageShow);
        containerShow.appendChild(titleShow);

        resultList.appendChild(containerShow);
      }
    });
};

fetchShows(urlData);

const searchShow = () => {
  const titleShow = document.querySelectorAll('.title__show');
  for (const title of titleShow) {
    const titleSearch = title.innerHTML;
    if (titleSearch.includes(searchInput.value)) {
      title.parentElement.classList.remove('hidden');
    } else {
      title.parentElement.classList.add('hidden');
    }
  }
};

searchButton.addEventListener('click', searchShow);
