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
        this.displaySlider();
        this.displayPopularMovies();
        break;
      case "/shows.html":
        this._showSpinner();
        this.displayPopularShows();
        break;
      case "/movie-details.html":
        this.displayMovieDetails();
        console.log("movies ");
        break;
      case "/tv-details.html":
        this.displayShowDetails();
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
  //display popular movies
  async displayPopularMovies() {
    this._showSpinner();
    const { results } = await this._fetchAPIData("movie/popular");
    this._hidespinner();

    results.forEach((movie) => {
      const movieID = movie.id;
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
  // display popular tv shows
  async displayPopularShows() {
    this._showSpinner();
    const { results } = await this._fetchAPIData("tv/popular");
    this._hidespinner();
    console.log(results);

    results.forEach((tv) => {
      const showId = tv.id;
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `<a href="tv-details.html?id=${tv.id}">
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
  // display movie details
  async displayMovieDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("id");
    console.log(movieId);

    this._showSpinner();
    const movie = await this._fetchAPIData(`movie/${movieId}`);

    this._hidespinner();
    console.log(movie);
    const detailsContainer = document.querySelector("#movie-details");
    detailsContainer.innerHTML = `
        <div class="details-top">
          <div>
          ${
            movie.poster_path
              ? `<img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.original_title}"
                />`
              : `<img
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
              ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
            </ul>
            <a href="${
              movie.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> ${
              movie.budget
            } </li>
            <li><span class="text-secondary">Revenue:</span> ${
              movie.revenue
            }</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movie.runtime
            } minutes </li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies.map(
            (company) => ` ${company.name}`
          )}</div>
        </div>
      `;
    this._setBackdrop(movie.backdrop_path, "movie");
  }
  // display show details
  async displayShowDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const showId = urlParams.get("id");
    console.log(showId);

    this._showSpinner();
    const show = await this._fetchAPIData(`tv/${showId}`);

    this._hidespinner();
    console.log(show);
    const detailsContainer = document.querySelector("#show-details");
    detailsContainer.innerHTML = `<div class="details-top">
          <div>
            ${
              show.poster_path
                ? `<img
                src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                class="card-img-top"
                alt="${show.name}"
                />`
                : `<img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${show.name}"
                />`
            }  
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)}/ 10
            </p>
            <p class="text-muted">Release Date: ${show.first_air_date}</p>
            <p>
              ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
            </ul>
            <a href="${
              show.homepage
            }" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${
              show.number_of_episodes
            } </li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> 
              ${show.last_episode_to_air.name}
            </li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies.map(
            (company) => ` ${company.name}`
          )}</div>
        </div>`;
    this._setBackdrop(show.backdrop_path, "show");
  }

  //display slider movies

  async displaySlider() {
    const { results } = await this._fetchAPIData("movie/now_playing");
    console.log(results);

    results.forEach((movie) => {
      const div = document.createElement("div");
      div.classList.add("swiper-slide");

      div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(1)} / 10
            </h4>
          
      `;
      document.querySelector(".swiper-wrapper").appendChild(div)
    }
  );
    this._initSwiper()
  }

  //private methods
  _initSwiper(){
    const swiper = new Swiper('.swiper', {
      sldiesPerView: 1,
      spaceBetween: 30,
      freeMode: true,
      loop: true,
      autoplay:{
        delay: 4000,
        disableOnInteraction: false
      },
      breakpoints:{
        500:{
          slidesPerView:2
        },
        700:{
          slidesPerView:3
        },
        1200:{
          slidesPerView:4
        },
        
      }

  
    })
  }

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
  _setBackdrop(path, type) {
    const backdropUrl = `https://image.tmdb.org/t/p/original${path}`;
    const overlayDiv = document.createElement("div");
    overlayDiv.style.backgroundImage = `url(${backdropUrl})`;

    overlayDiv.style.position = "fixed"; // Position it relative to the viewport
    overlayDiv.style.top = "0";
    overlayDiv.style.left = "0";
    overlayDiv.style.width = "100vw"; // 100% viewport width
    overlayDiv.style.height = "100vh"; // 100% viewport height
    // -----------------------

    overlayDiv.style.zIndex = "-1"; // Now this will work
    overlayDiv.style.opacity = "0.1"; // 10% opacity (very faint)

    if (type === "movie") {
      document.querySelector("#movie-details").appendChild(overlayDiv);
    } else {
      document.querySelector("#show-details").appendChild(overlayDiv);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new App();
});
