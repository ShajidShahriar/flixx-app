class App {
  constructor() {
    this.currentPage = window.location.pathname;
    this.init();
  }

  init() {
    switch (this.currentPage) {
      case "/":
      case "/index.html":
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
    this.highlightActiveLink();
  }

  highlightActiveLink() {
    const links = document.querySelectorAll(".nav-link");
    links.forEach((link) => {
      if (link.getAttribute("href") === this.currentPage) {
        link.classList.add("active");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new App();
});
