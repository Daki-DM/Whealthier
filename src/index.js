import {
  Route,
  Router
} from './miscellaneous/router.js'
import { NavBar } from './components/nav-bar/nav-bar.js';
import {
  MeditationCornerView
} from './views/meditation-corner/meditation-corner.js';
import { HomeView } from './views/home/home.js';

const apiData = {
  appId: '810208fd',
  appKey: 'd4e09ca11057c2b54c3cec4b689831ed'
}

let nav = document.getElementById('nav');
let menu = document.getElementById('menu');
let menuToggler = document.getElementById('menu-toggler');

let routes = [
  new Route('/', HomeView),
  new Route('/features', MeditationCornerView)
]

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (event) => {
    if(event.target.matches('[spa-page-link]')) {
      event.preventDefault();
      Router.navigateTo(event.target.href, routes);
    }
  });
  Router.router(routes);
});