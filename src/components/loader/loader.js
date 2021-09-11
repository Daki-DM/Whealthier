let loaderStyle = `
.loader-container {
  border: 10px solid #f3f3f3;
  border-top: 10px solid rgba(81, 88, 185, 1.0);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

class Loader extends HTMLElement {
  constructor() {
    super();
    
    let shadow = this.attachShadow({mode: 'open'});
    
    // shows loading animation until the content gets loaded
    let content = document.createElement('div');
    content.classList.add('loader-container');
    
    let style = document.createElement('style');
    style.innerHTML = loaderStyle;
    content.appendChild(style);
    
    shadow.appendChild(content);
  }
};

customElements.define('loader-component', Loader);

export {
  Loader
};