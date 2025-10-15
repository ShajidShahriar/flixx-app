const global = {
  currentPage: window.location.pathname,
};

//init app

function init() {
  switch (global.currentPage) {
    case "/":
      console.log("home");
      break;
    case "/shows.html":
      console.log("shows");
      break;
    case "/movie-details.html":
      console.log("movies ");
      break;
    case "/tv-details.html":
      console.log("tv");
      break;
    case "/search.html":
      console.log("search");
      break;
  }
}

document.addEventListener("DOMContentLoaded", init);
