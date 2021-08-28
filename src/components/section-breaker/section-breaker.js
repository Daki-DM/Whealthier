class SectionBreaker extends HTMLElement {
  constructor() {
    super();
    
    let shadow = this.attachShadow({mode: 'open'});
    
    let content = document.createElement('div');
    content.classList.add('section-breaker');
    
    let style = document.createElement('style');
    style.innerHTML = `
    .section-breaker {
      background-color: black;
      height: 3px;
      margin: 20px 0;
      position: relative;
      border-radius: 10%;
      animation: startupAnim 1s normal forwards;
      z-index: -1;
    }
    @keyframes startupAnim {
      from {
        width: 0;
      }
      to {
        width: 25%;
      }
    }
    `;
    
    shadow.appendChild(style);
    shadow.appendChild(content);
  }
}

customElements.define('section-break', SectionBreaker);

export {
  SectionBreaker
};