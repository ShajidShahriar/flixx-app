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
        this.displayPopularMovies()
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
  //public methods 
  async displayPopularMovies(){
    const {results} = await this._fetchAPIData('movie/popular')
    console.log(results)
    
  }

  //private methods 
  async _fetchAPIData(endpoint){
    const API_KEY = this.api.key
    const API_URL = this.api.baseUrl


    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&Language=en_US`)
    const data = await response.json()
    return data

  }
}


document.addEventListener("DOMContentLoaded", () => {
  const app = new App();
});
