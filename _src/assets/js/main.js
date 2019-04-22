'use strict';

const searchInput = document.querySelector('.search__input');
const searchButton = document.querySelector('.search__button');
const resultList = document.querySelector('.result__list');
const imageSust = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
const api = 'http://api.tvmaze.com/search/shows?q=';

const showClick = () => {
  const term = searchInput.value;
  const url = api + term;

  const fetchShows = url => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          const containerShow = document.createElement('li');
          containerShow.classList.add('container__show');
          const titleShow = document.createElement('h2');
          titleShow.classList.add('title__show');
          const imageShow = document.createElement('img');
          imageShow.classList.add('image__show');
          const dataImg = data[i].show.image;
          if (dataImg === null) {
            imageShow.src = imageSust;
          } else {
            imageShow.src = dataImg.medium;
          }
          imageShow.alt = data[i].show.name;

          const titleShowContent = document.createTextNode(data[i].show.name);

          titleShow.appendChild(titleShowContent);

          containerShow.appendChild(imageShow);
          containerShow.appendChild(titleShow);

          resultList.appendChild(containerShow);

          const handlElementClick = event => {
            const selectedBackgorund = event.currentTarget;
            const slectedText = event.currentTarget.querySelector(
              '.title__show'
            );
            selectedBackgorund.classList.toggle('container__show-selected');
            slectedText.classList.toggle('title__show-selected');
          };
          containerShow.addEventListener('click', handlElementClick);
          titleShow.addEventListener('click', handlElementClick);
        }
      });
  };

  fetchShows(url);
};

searchButton.addEventListener('click', showClick);
