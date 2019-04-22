'use strict';

const searchInput = document.querySelector('.search__input');
const searchButton = document.querySelector('.search__button');
const resultList = document.querySelector('.result__list');
const favList = document.querySelector('.fav__list');
let arrFav = [];
const imageSust = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
const api = 'http://api.tvmaze.com/search/shows?q=';

const showClick = () => {
  const term = searchInput.value;
  const url = api + term;

  const fetchShows = url => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        resultList.innerHTML = '';
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

          //   containerShow.addEventListener('click', handlElementClick);
          //   titleShow.addEventListener('click', handlElementClick);
          containerShow.addEventListener('click', function(event) {
            favoriteShow(event, titleShow, imageShow);
          });
        }
      });
  };

  fetchShows(url);
};

function favoriteShow(event, name, image) {
  const trigger = event.currentTarget;
  trigger.classList.toggle('container__show-selected');

  const objectFav = {};
  objectFav.name = `${name.innerHTML}`;
  objectFav.image = `${image.src}`;

  if (trigger.classList.contains('container__show-selected')) {
    arrFav.push(objectFav);
  }
  console.log(arrFav);

  const containerShowFav = document.createElement('li');
  containerShowFav.classList.add('container__show-fav');
  const titleShowFav = document.createElement('h2');
  titleShowFav.classList.add('title__show-fav');
  const imageShowFav = document.createElement('img');
  imageShowFav.classList.add('image__show-fav');
  imageShowFav.src = objectFav.image;
  imageShowFav.alt = objectFav.name;

  const titleShowContentFav = document.createTextNode(objectFav.name);

  titleShowFav.appendChild(titleShowContentFav);

  containerShowFav.appendChild(imageShowFav);
  containerShowFav.appendChild(titleShowFav);

  favList.appendChild(containerShowFav);
}

searchButton.addEventListener('click', showClick);
