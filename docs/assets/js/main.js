"use strict";const searchInput=document.querySelector(".search__input"),searchButton=document.querySelector(".search__button"),resultList=document.querySelector(".result__list"),favList=document.querySelector(".fav__list"),resetButton=document.querySelector(".reset__button");let arrFav=[];const imageSust="https://via.placeholder.com/210x295/ffffff/666666/?text=TV",api="http://api.tvmaze.com/search/shows?q=";null!==getData()&&(arrFav=getData(),refresh());const showClick=()=>{const e=searchInput.value;fetchShows(api+e)},fetchShows=e=>{fetch(e).then(e=>e.json()).then(e=>{resultList.innerHTML="";for(let t=0;t<e.length;t++){const a=document.createElement("li");a.classList.add("container__show");const n=e[t].show.id,r=document.createElement("h2");r.classList.add("title__show");const s=document.createTextNode(e[t].show.name);r.appendChild(s);const c=document.createElement("img");c.classList.add("image__show");const i=e[t].show.image;c.src=null===i?imageSust:i.medium,c.alt=e[t].show.name,a.appendChild(c),a.appendChild(r),resultList.appendChild(a),a.addEventListener("click",function(e){favoriteShow(e,n,r,c)})}})};function favoriteShow(e,t,a,n){const r=e.currentTarget;r.classList.toggle("container__show-selected");const s={};if(s.id=`${t}`,s.name=`${a.innerHTML}`,s.image=`${n.src}`,r.classList.contains("container__show-selected")){let e=arrFav.findBy("id",`${t}`);null==e&&(arrFav.push(s),refresh())}else{quit(arrFav.findBy("id",`${t}`)),refresh()}console.log(arrFav)}function quit(e){let t=arrFav.indexOf(e);-1!==t&&arrFav.splice(t,1)}function refresh(){favList.innerHTML="";for(let e=0;e<arrFav.length;e++){const t=document.createElement("li");t.classList.add("container__show-fav");const a=document.createElement("h3");a.classList.add("title__show-fav");const n=document.createElement("img");n.classList.add("image__show-fav"),n.src=arrFav[e].image,n.alt=arrFav[e].name;const r=document.createTextNode(arrFav[e].name);a.appendChild(r),addIcon(a,arrFav[e].name),t.appendChild(n),t.appendChild(a),favList.appendChild(t)}saveData()}function addIcon(e,t){const a=document.createElement("i");a.classList.add("fas","fa-times-circle"),e.appendChild(a),a.addEventListener("click",function(){quit(arrFav.findBy("name",t)),refresh()})}function saveData(){localStorage.setItem("arrFav",JSON.stringify(arrFav))}function getData(){return JSON.parse(localStorage.getItem("arrFav"))}Array.prototype.findBy=function(e,t){for(let a=0;a<this.length;a++){let n=this[a];if(e in n&&n[e]===t)return n}return null},searchButton.addEventListener("click",showClick),searchInput.addEventListener("keyup",function(e){13===e.keyCode&&showClick()}),resetButton.addEventListener("click",()=>{arrFav=[],refresh()});