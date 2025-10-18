class App {
  constructor() {
    this.currentPage = window.location.pathname;
    this.api = {
      key: "76d1c5112ca81a0c8a3286859b2a5a57",
      baseUrl: "https://api.themoviedb.org/3/",
    };
    this.init();
  }

  init() {
    switch (this.currentPage) {
      case "/":
      case "/index.html":
        this.displayPopularMovies();
        break;
      case "/shows.html":
        this.displayPopularShows();
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
  //public methods
  async displayPopularMovies() {
    const { results } = await this._fetchAPIData("movie/popular");
    console.log(results);

    results.forEach((movie) => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
            <a href="movie-details.html?id=1">
              ${movie.poster_path ?
              `<img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title}"
              />` : `<img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${movie.title}"
              />`}
            </a>
            <div class="card-body">
              <h5 class="card-title">${movie.title}</h5>
              <p class="card-text">
                <small class="text-muted">${movie.release_date}</small>
              </p>
            </div>
          `;
          document.querySelector("#popular-movies").appendChild(div)
    });
  }

async displayPopularShows() {
    const { results } = await this._fetchAPIData("tv/popular");
    console.log(results);

    results.forEach((tv) => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `<a href="tv-details.html?id=1">
            ${tv.poster_path ?
            `<img
              src="https://image.tmdb.org/t/p/w500${tv.poster_path}"
              class="card-img-top"
              alt="${tv.name}"
            />` : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${tv.name}"
            />`}

          </a>
          <div class="card-body">
            <h5 class="card-title">${tv.name}</h5>
            <p class="card-text">
              <small class="text-muted">${tv.first_air_date}</small>
            </p>
          </div>
          `;
        document.querySelector("#popular-shows").appendChild(div)

          
    });
  }



  //private methods
  async _fetchAPIData(endpoint) {
    const API_KEY = this.api.key;
    const API_URL = this.api.baseUrl;

    const response = await fetch(
      `${API_URL}${endpoint}?api_key=${API_KEY}&Language=en_US`
    );
    const data = await response.json();
    return data;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new App();
});
