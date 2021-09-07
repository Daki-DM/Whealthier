import {
  Router
} from './miscellaneous/router.js'
import { NavBar } from './components/nav-bar/nav-bar.js';
import { SectionBreaker } from './components/section-breaker/section-breaker.js';

let nav = document.getElementById('nav');
let menu = document.getElementById('menu');
let menuToggler = document.getElementById('menu-toggler');

window.addEventListener('popstate', Router.router);

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (event) => {
    if(event.target.getAttribute('spa-page-link') == 'true') {
      event.preventDefault();
      Router.navigateTo(event.target.href);
    }
  });
  Router.router();
});