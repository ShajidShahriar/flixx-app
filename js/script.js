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
        this._showSpinner()
        this.displayPopularShows();
        break;
      case "/movie-details.html":
        this.displayMovieDetails()
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
    this._showSpinner()
    const { results } = await this._fetchAPIData("movie/popular");
    this._hidespinner()
    console.log(results);

    results.forEach((movie) => {
      const movieID = movie.id
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
            <a href="movie-details.html?id=${movieID}">
              ${
                movie.poster_path
                  ? `<img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title}"
              />`
                  : `<img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${movie.title}"
              />`
              }
            </a>
            <div class="card-body">
              <h5 class="card-title">${movie.title}</h5>
              <p class="card-text">
                <small class="text-muted">${movie.release_date}</small>
              </p>
            </div>
          `;
      document.querySelector("#popular-movies").appendChild(div);
    });
  }

  async displayPopularShows() {
    this._showSpinner()
    const { results } = await this._fetchAPIData("tv/popular");
    this._hidespinner()
    console.log(results);

    results.forEach((tv) => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `<a href="tv-details.html?id=1">
            ${
              tv.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${tv.poster_path}"
              class="card-img-top"
              alt="${tv.name}"
            />`
                : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${tv.name}"
            />`
            }

          </a>
          <div class="card-body">
            <h5 class="card-title">${tv.name}</h5>
            <p class="card-text">
              <small class="text-muted">${tv.first_air_date}</small>
            </p>
          </div>
          `;
      document.querySelector("#popular-shows").appendChild(div);
    });
  }
  async displayMovieDetails(){
    const urlParams = new URLSearchParams(window.location.search)
    const movieId = urlParams.get('id')
    console.log(movieId)

    this._showSpinner()
    const movie = await this._fetchAPIData(`movie/${movieId}`)
    
    this._setBackdrop(movie.backdrop_path)
    this._hidespinner()
    console.log(movie)
    const detailsContainer = document.querySelector(".movie-details")
    detailsContainer.innerHTML = `
        <div class="details-top">
          <div>
          ${movie.poster_path ?

            `<img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.original_title}"
                />` :`<img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${movie.original_title}"
                />`
                }  
          </div>
          <div>
            <h2>${movie.original_title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)}/10
            </p>
            <p class="text-muted">Release Date:${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres.map(genre => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> ${movie.budget} </li>
            <li><span class="text-secondary">Revenue:</span> ${movie.revenue}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes </li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies.map(company => ` ${company.name}`)}</div>
        </div>
      `
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
  _showSpinner() {
    document.querySelector(".spinner").classList.add("show");
  }
  _hidespinner() {
    document.querySelector(".spinner").classList.remove("show");
  }
  _setBackdrop(path){
    const backdropUrl = `https://image.tmdb.org/t/p/original${path}`
    const backdropEl =  document.body
    backdropEl.style.backgroundImage = `url(${backdropUrl})`

    backdropEl.style.backgroundSize = 'cover';
    backdropEl.style.backgroundPosition = 'center';
    backdropEl.style.backgroundRepeat = 'no-repeat';

  }
}



document.addEventListener("DOMContentLoaded", () => {
  const app = new App();
});
