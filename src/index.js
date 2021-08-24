import {
  Route,
  Router
} from './miscellaneous/router.js'
import { NavBar } from './views/nav-bar/nav-bar.js';

const apiData = {
  appId: '810208fd',
  appKey: 'd4e09ca11057c2b54c3cec4b689831ed'
}

let nav = document.getElementById('nav');
let menu = document.getElementById('menu');
let menuToggler = document.getElementById('menu-toggler');

let routes = [
  new Route('/', ''),
  new Route('/search', './miscellaneous/searchBar/searchBar.js')
]

document.addEventListener('DOMContentLoaded', () => {
  new Router(routes);
});