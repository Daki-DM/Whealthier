class SearchBar extends HTMLElement {
  constructor() {
    super();
    
    let shadow = this.attachShadow({mode: 'open'});
    
    let content = document.createElement('div');
    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Whealthier of your meal here');
    content.appendChild(input);
    
    shadow.appendChild(content);
  }
}

customElements.define('search-bar', SearchBar);

export {
  SearchBar
};