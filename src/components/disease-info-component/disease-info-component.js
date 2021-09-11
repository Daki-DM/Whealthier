let healthInfoStyle = `
.disease-info {
  padding-top: 5rem;
  margin-left: 4rem;
  margin-right: 4rem;
  padding-bottom: 4rem;
}

.disease-info h2 {
  font-family: 'Rubik', sans-serif;
  margin-bottom: 1rem;
}

.input-container {
  display: flex;
  flex-direction: row;
  height: calc(2rem + 4px);
  align-items: center;
  justify-content: center;
}

input[type=text] {
  border-radius: 10px 0 0 10px;
  padding: 5px 10px;
  border: 2px solid rgba(81, 88, 185, 1.0);
  outline: none;
  color: black;
  font-size: 1.1rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  width: 100%;
  max-width: 500px;
  max-height: 100%;
  box-sizing: border-box;
  background-color: #F6F6F6;
}

input[type=text]:focus {
  border: 2px solid rgba(81, 88, 185, .8);
}

input[type=text]:hover {
  border: 2px solid rgba(81, 88, 185, .9);
}

button {
  background-color: rgba(81, 88, 185, 1.0);
  color: #F2F2F2;
  border-radius: 0 10px 10px 0;
  outline: none;
  border: 2px solid rgba(81, 88, 185, 1.0);
  padding: 5px 10px;
  height: 100%;
  font-family: Arial;
  font-size: 1rem;
  font-weight: 600;
}

.output-container {
  display: flex;
  justify-content: center;
  max-width: 70ch;
  min-width: 100%;
}

.output {
  box-sizing: border-box;
  background-color: #F6F6F6;
  border-radius: 10px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  margin-top: 2rem;
  font-family: 'Rubik', sans-serif;
  font-size: 1rem !important;
  color: #111;
  white-space: wrap;
  max-width: 70ch;
}

span {
  font-weight: bold;
  font-size: 1rem;
  display: inline;
  color: rgba(81, 88, 185, 1.0);
  position: relative;
}

span:first-letter {
  text-transform: uppercase;
}

ul {
  list-style: disc;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 5px;
  margin: 10px 0;
}

li::marker {
  color: rgba(81, 88, 185, 1.0);
}

li {
  position: relative;
  font-size: 1rem !important;
}

.output.active {
  padding: 20px;
}

#loader {
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .disease-info {
    padding-top: 5rem;
    margin-left: 10px;
    margin-right: 10px;
  }
  .input-container {
    grid-template-columns: 1fr;
  }
  input[type=text] {
    max-width: calc(100% - 20px) !important;
    min-width: auto;
    width: 100%;
  }
  .output.active {
    padding: 10px;
  }
}
`;

class DiseaseInfoComponent extends HTMLElement {
  outputContainer = document.createElement('div');
  output = document.createElement('div');
  loader = document.createElement('loader-component');
  constructor() {
    super();

    let shadow = this.attachShadow({ mode: 'open' });

    let content = document.createElement('div');
    content.classList.add('disease-info');

    let heading = document.createElement('h2');
    heading.innerHTML = 'Disease Info';

    content.appendChild(heading);
    
    let inputContainer = document.createElement('form');
    inputContainer.classList.add('input-container');
    inputContainer.setAttribute('action', '');
    inputContainer.setAttribute('method', 'get');
    inputContainer.setAttribute('id', 'disease-query');
    
    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Disease Name');
    input.setAttribute('required', true);

    let button = document.createElement('button');
    button.innerHTML = 'Search';
    button.setAttribute('type', 'submit');
    
    this.loader.setAttribute('id', 'loader');
    
    inputContainer.addEventListener('submit', (ev) => {
      ev.preventDefault();
      this.outputContainer.innerHTML = '';
      this.output.innerHTML = '';
      this.outputContainer.appendChild(this.loader);
      this.getDiseaseInfo(input.value);
    });
    
    inputContainer.append(input, button);

    content.appendChild(inputContainer);
    
    this.outputContainer.classList.add('output-container');
    
    this.output.classList.add('output');
    this.outputContainer.appendChild(this.output);
    content.appendChild(this.outputContainer);

    let style = document.createElement('style');
    style.innerHTML = healthInfoStyle;
    content.appendChild(style);

    shadow.appendChild(content);
  }
  getDiseaseInfo(queryStr) {
    fetch(
      '/api/getDiseaseInfo',
      {
        method: 'POST',
        body: JSON.stringify({ query: queryStr }),
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
    .then(v => {
      if(v.status === 404) {
        return { '_': '<p>Unable to get information on the given query :/</p>' };
      }
      return v.json();
    })
    .then(v => {
      this.renderOutput(v);
      this.output.classList.add('active');
    });
  }
  renderOutput(result) {
    this.outputContainer.removeChild(this.loader);
    this.outputContainer.appendChild(this.output);
    this.output.innerHTML = result['_'];
  }
};

customElements.define('disease-info', DiseaseInfoComponent);

export {
  DiseaseInfoComponent
};