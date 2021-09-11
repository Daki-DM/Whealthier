import { NavListElement } from './nav-list-element.js';

let navListArray = [
  { href: '/', name: 'home' },
  { href: '/#features', name: 'features'},
  { href: '/about', name: 'about' }
];

let navBarStyle = document.createElement('style');
navBarStyle.innerHTML = `
.nav-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  transition: all 0.1s ease;
  border: 1px solid rgba(255, 255, 255, 0.18);
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  background-color: rgba(255, 255, 255, .9);
  padding: 0 10px;
  box-sizing: border-box;
  z-index: 20;
}
.nav-container.chip-off {
  position: fixed;
  width: 95%;
  margin-top: 0.8rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 10px;
}
.nav-container .nav-heading {
  display: block;
  font-size: 1.2rem;
  font-family: 'Sigmar One', cursive;
}
.nav-container .nav-menu-toggler {
  display: none;
  outline: none;
  border: none;
  font-size: 2rem;
  background-color: transparent;
}
.nav-container .nav-list {
  list-style: none;
  display: flex;
  flex-direction: row;
}
@media(max-width: 768px) {
  .break {
    flex-basis: 100%;
    height: 0;
  }
  .nav-container .nav-menu-toggler {
    display: block;
  }
  .nav-container .nav-list {
    flex-direction: column;
    order: 3;
    width: 100%;
    display: none;
    margin-top: 0;
    padding: 0;
  }
  .nav-container .nav-list.active {
    display: flex;
  }
}
`;

class NavBar extends HTMLElement {
  constructor() {
    super();

    let shadow = this.attachShadow({ mode: 'open' });

    let container = document.createElement('div');
    container.classList.add('nav-container');

    let heading = document.createElement('div');
    heading.classList.add('nav-heading');
    heading.innerText = 'Whealthier';

    let toggler = document.createElement('button');
    toggler.classList.add('nav-menu-toggler');
    toggler.innerText = '\u2261';

    let flexBreak = document.createElement('div');
    flexBreak.classList.add('break');

    let navList = document.createElement('ul');
    navList.classList.add('nav-list');

    for (let i = 0; i < navListArray.length; i++) {
      let li = document.createElement('nav-list-element');
      li.setAttribute('href', navListArray[i].href);
      li.setAttribute('name', navListArray[i].name);
      li.addEventListener('click', () => {
        navList.classList.remove('active');
      });
      navList.appendChild(li);
    }

    // the stuff that handles the beautiful navbar animation
    document.addEventListener('scroll', (ev) => {
      if (
        document.body.scrollTop > 1 ||
        document.documentElement.scrollTop > 1
      ) {
        container.classList.add('chip-off');
      } else {
        container.classList.remove('chip-off');
      }
    });
    
    // close navbar when pressed somewhere else
    document.addEventListener('click', () => {
      navList.classList.remove('active');
    });

    // for toggling navbar
    toggler.onclick = (ev) => {
      ev.stopPropagation();
      navList.classList.toggle('active');
    }

    container.appendChild(navBarStyle.cloneNode(true));
    container.appendChild(heading);
    container.appendChild(toggler);
    container.appendChild(flexBreak);
    container.appendChild(navList);

    shadow.appendChild(container);
  }
}

customElements.define('nav-bar', NavBar);

export {
  NavBar
};