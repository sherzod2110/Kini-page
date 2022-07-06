"use strict";
const template = document.querySelector(".template").content;
const elList = document.querySelector(".list");
const elInput = document.querySelector(".input");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const elBtns = document.querySelector(".btns")
// console.log(elList.length);
const API_KEY = "b1566df1";
let search = "panda";
let page = 1;

const renderMovies = function (arr, htmlElement) {
  const filmsFragment = document.createDocumentFragment();

  elList.innerHTML = null;

  arr.forEach((movie) => {
    const copyTemplate = template.cloneNode(true);

    copyTemplate.querySelector(".film__img").src = movie.Poster;
    copyTemplate.querySelector(".film__title").textContent = movie.Title;
    copyTemplate.querySelector(".film__year").textContent = movie.Year;

    filmsFragment.appendChild(copyTemplate);
  });

  htmlElement.appendChild(filmsFragment);
};

const getMovies = async function () {
  const request = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&page=${page}`
  );


  const movies = await request.json();

  // console.log(movies);
  btns(movies)
  if (movies.Response === "True" && movies.Search.length > 0) {
    renderMovies(movies.Search, elList);
  }
};

getMovies();

elInput.addEventListener("input", function () {
  search = elInput.value;

  getMovies();
});

prevBtn.addEventListener("click", function () {
  if (page > 1) {
    page--;
  }

  getMovies();
});

nextBtn.addEventListener("click", function () {
  page++;

  getMovies();
});


function btns (arr) {
  elBtns.innerHTML = "";

  for (let i = 1; i < Math.ceil(arr.totalResults / 10); i++) {
    const newBtn = document.createElement("button");
    newBtn.textContent = i;

    elBtns.append(newBtn);
  }
}


elBtns.addEventListener("click", function(evt) {

  page = evt.target.textContent;

  getMovies()
})

getMovies(API_KEY, search, page)