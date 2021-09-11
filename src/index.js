import {
  Router
} from './miscellaneous/router.js'
import { NavBar } from './components/nav-bar/nav-bar.js';
import { SectionBreaker } from './components/section-breaker/section-breaker.js';
import { Loader } from './components/loader/loader.js';

let nav = document.getElementById('nav');
let menu = document.getElementById('menu');
let menuToggler = document.getElementById('menu-toggler');

// handle route when user presses back
window.addEventListener('popstate', Router.router);

document.addEventListener('DOMContentLoaded', () => {
  // check if user pressed on a router-link
  document.addEventListener('click', (event) => {
    if(event.target.getAttribute('spa-page-link') == 'true') {
      event.preventDefault();
      Router.navigateTo(event.target.href);
    }
  });
  // render current route based on current href
  Router.router();
});