import { request } from './utils/request.js';
import { SearchBar } from './views/searchBar/searchBar.js';

const apiData = {
  appId: '810208fd',
  appKey: 'd4e09ca11057c2b54c3cec4b689831ed'
}

let nav = document.getElementById('nav');
let menu = document.getElementById('menu');
let menuToggler = document.getElementById('menu-toggler');

document.onscroll = (ev) => {
  if (
    document.body.scrollTop > 2 ||
    document.documentElement.scrollTop > 2
  ) {
    nav.classList.add('chip-off');
  } else {
    nav.classList.remove('chip-off');
  }
};

menuToggler.onclick = () => {
  menu.classList.toggle('active');
}