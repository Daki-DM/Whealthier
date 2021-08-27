let navListElemStyle = document.createElement('style');
navListElemStyle.innerHTML = `
li {
  margin-left: 40px;
}
li a {
  text-decoration: none;
  font-size: 0.9rem;
  color: black;
  letter-spacing: 0.3ch;
  position: relative;
  font-family: Arial;
}
li a::after {
  position: absolute;
  content: '';
  height: 2px;
  background-color: green;
  left: 0;
  bottom: -2px;
  width: 0;
  transition: 0.4s ease;
}
li a:hover::after {
  width: 100%;
}
@media (max-width: 768px) {
  li {
    margin: 5px 0;
  }
}
`;

class NavListElement extends HTMLElement {
  a = null;
  constructor() {
    super();
    
    let shadow = this.attachShadow({mode: 'open'});
    
    let li = document.createElement('li');
    
    this.a = document.createElement('a');
    
    li.appendChild(this.a);
    
    shadow.appendChild(navListElemStyle.cloneNode(true));
    shadow.appendChild(li);
  }
  connectedCallback() {
    this.a.setAttribute('href', this.attributes.href.value);
    this.a.innerText = this.attributes.name.value;
  }
};

customElements.define('nav-list-element', NavListElement)

export {
  NavListElement
};