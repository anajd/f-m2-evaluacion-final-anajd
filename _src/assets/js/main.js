'use strict';

const searchInput = document.querySelector('.search__input');
const searchButton = document.querySelector('.search__button');
const resultList = document.querySelector('.result__list');
const favList = document.querySelector('.fav__list');
const resetButton = document.querySelector('.reset__button');
let arrFav = [];
const imageSust = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
const api = 'http://api.tvmaze.com/search/shows?q=';

if (getData() !== null) {
  arrFav = getData();
  refresh();
}

const showClick = () => {
  const term = searchInput.value;
  const url = api + term;
  fetchShows(url);
};

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
        const titleShowContent = document.createTextNode(data[i].show.name);
        titleShow.appendChild(titleShowContent);

        const imageShow = document.createElement('img');
        imageShow.classList.add('image__show');
        const dataImg = data[i].show.image;
        if (dataImg === null) {
          imageShow.src = imageSust;
        } else {
          imageShow.src = dataImg.medium;
        }
        imageShow.alt = data[i].show.name;

        containerShow.appendChild(imageShow);
        containerShow.appendChild(titleShow);

        resultList.appendChild(containerShow);

        containerShow.addEventListener('click', function(event) {
          favoriteShow(event, titleShow, imageShow);
        });
      }
    });
};

function favoriteShow(event, name, image) {
  const trigger = event.currentTarget;
  trigger.classList.toggle('container__show-selected');

  const objectFav = {};
  objectFav.name = `${name.innerHTML}`;
  objectFav.image = `${image.src}`;

  if (trigger.classList.contains('container__show-selected')) {
    let duplicatedObj = arrFav.findBy('name', `${name.innerHTML}`); // Busca si la pelicula está en el array
    if (duplicatedObj === undefined || duplicatedObj === null) {
      arrFav.push(objectFav); // Si no está se añade
      refresh();
    }
  } else {
    let eliminatedItem = arrFav.findBy('name', `${name.innerHTML}`); // Busca la película a eliminar
    quit(eliminatedItem); // Elimina la pelicula del array
    refresh();
  }

  console.log(arrFav);
}

Array.prototype.findBy = function(key, value) {
  // Devolverá el objeto que coincida con key-value indicados como argumentos de la función
  for (let i = 0; i < this.length; i++) {
    let object = this[i];
    if (key in object && object[key] === value) {
      return object;
    }
  }
  return null;
  // Devolverá null en caso de no hallar coincidencia, en caso contrario devolverá el objeto coincidente
};

function quit(obj) {
  let index = arrFav.indexOf(obj); // Devuelve la posicion del objeto en el array
  if (index !== -1) {
    // Si devuelve -1 el objeto no existe en el array
    arrFav.splice(index, 1);
    console.log(arrFav);
  }
}

function refresh() {
  favList.innerHTML = '';
  for (let i = 0; i < arrFav.length; i++) {
    const containerShowFav = document.createElement('li');
    containerShowFav.classList.add('container__show-fav');
    const titleShowFav = document.createElement('h3');
    titleShowFav.classList.add('title__show-fav');
    const imageShowFav = document.createElement('img');
    imageShowFav.classList.add('image__show-fav');
    imageShowFav.src = arrFav[i].image;
    imageShowFav.alt = arrFav[i].name;

    const titleShowContentFav = document.createTextNode(arrFav[i].name);

    titleShowFav.appendChild(titleShowContentFav);
    addIcon(titleShowFav, arrFav[i].name);
    containerShowFav.appendChild(imageShowFav);
    containerShowFav.appendChild(titleShowFav);

    favList.appendChild(containerShowFav);
  }
  saveData();
}

function addIcon(element, name) {
  const icon = document.createElement('i');
  icon.classList.add('fas', 'fa-times-circle');
  element.appendChild(icon);
  icon.addEventListener('click', function quitFav() {
    let eliminateFav = arrFav.findBy('name', name);
    quit(eliminateFav);
    refresh();
  });
}

function saveData() {
  localStorage.setItem('arrFav', JSON.stringify(arrFav));
}

function getData() {
  return JSON.parse(localStorage.getItem('arrFav'));
}

searchButton.addEventListener('click', showClick);
searchInput.addEventListener('keyup', function(e) {
  if (e.keyCode === 13) {
    showClick();
  }
});
resetButton.addEventListener('click', () => {
  arrFav = [];
  refresh();
});
