import '../css/style.css';
import '../css/spinner.css';
import 'swiper/css'; 
import '@fortawesome/fontawesome-free/css/all.css';


// 2. Import your App class from app.js
import App from './app.js'; 

// 3. Initialize the app on page load
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
});