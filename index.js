import { main } from './src/index.js'

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

main();