let inputsRequired = [
  { name: 'Age', id: 'age' },
  { name: 'Height', id: 'height' },
  { name: 'Weight', id: 'weight' },
  { name: 'Neck Circumference', id: 'n-c' },
  { name: 'Waist Circumference', id: 'w-c' },
  { name: 'Hip Circumference', id: 'h-c' },
];

let macroCalculatorStyle = `
.macro-calculator {
  padding-top: 5rem;
  margin-left: 4rem;
  margin-right: 4rem;
  padding-bottom: 4rem;
}

.macro-calculator h2 {
  font-family: 'Rubik', sans-serif;
  margin-bottom: 1rem;
}

.person-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px 0;
}

.input-container {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: start;
  max-width: 100%;
  justify-self: center;
}

label {
  font-family: 'Rubik', sans-serif;
  font-weight: 600;
}

input {
  height: 2rem;
  border-radius: 10px;
  border: none;
  outline: none;
  padding: 5px 10px;
  background-color: rgba(81, 88, 185, 1.0);
  color: #F2F2F2;
  font-size: 1.1rem;
  font-family: 'Poppins', sans-serif;
}

input:focus {
  background-color: rgba(81, 88, 185, .8);
}

button {
  display: inline-block;
  font-family: Arial;
  font-weight: 700;
  padding: 7px 17px;
  background-color: rgba(81, 88, 185, 1.0);
  color: #F2F2F2;
  border-radius: 5px;
  margin-top: 1rem;
  font-size: 1rem;
  text-decoration: none;
  outline: none;
  border: none;
  float: right;
}

@media (max-width: 768px) {
  .macro-calculator {
    padding-top: 5rem;
    margin-left: 10px;
    margin-right: 10px;
  }
  .person-details {
    grid-template-columns: 1fr;
  }
  input {
    max-width: calc(100% - 20px) !important;
  }
}
`;

class MacroCalculatorComponent extends HTMLElement {
  personDetails = null;
  constructor() {
    super();
    
    let shadow = this.attachShadow({mode: 'open'});
    
    let content = document.createElement('div');
    content.classList.add('macro-calculator');
    
    let form = document.createElement('form');
    
    this.personDetails = document.createElement('div');
    this.personDetails.classList.add('person-details');
    
    inputsRequired.forEach((obj) => {
      let container = document.createElement('div');
      container.classList.add('input-container');
      
      let label = document.createElement('label');
      label.setAttribute('for', obj.id);
      label.innerHTML = obj.name;
      
      let input = document.createElement('input');
      input.setAttribute('id', obj.id);
      input.setAttribute('type', 'number');
      
      container.appendChild(label);
      container.appendChild(input);
      
      this.personDetails.appendChild(container);
    });
    
    form.appendChild(this.personDetails);
    
    content.appendChild(form);
    let style = document.createElement('style');
    style.innerHTML = macroCalculatorStyle;
    
    shadow.appendChild(style);
    shadow.appendChild(content);
  }
};

customElements.define('macro-calculator', MacroCalculatorComponent);

export {
  MacroCalculatorComponent
};