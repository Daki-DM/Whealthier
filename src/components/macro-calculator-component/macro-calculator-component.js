import { Person } from '../../miscellaneous/person.js'

let inputsRequired = [
  { name: 'Age', id: 'age', elem: null },
  { name: 'Height', id: 'height', elem: null},
  { name: 'Weight', id: 'weight', elem: null},
  { name: 'Neck Circumference', id: 'n-c', elem: null},
  { name: 'Waist Circumference', id: 'w-c', elem: null},
  { name: 'Hip Circumference', id: 'h-c', elem: null},
];

let macroCalculatorStyle = `
.macro-calculator {
  padding-top: 5rem;
  margin-left: 4rem;
  margin-right: 4rem;
  padding-bottom: 4rem;
}

form {
  display: grid;
}

.macro-calculator h2 {
  font-family: 'Rubik', sans-serif;
  margin-bottom: 1rem;
}

.person-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px 30px;
  justify-items: stretch;
}

.input-container {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: start;
  max-width: 100%;
}

.person-details label {
  font-family: 'Rubik', sans-serif;
  font-weight: 600;
}

.person-details .text-input {
  height: 2rem;
  border-radius: 10px;
  border: none;
  outline: none;
  padding: 5px 10px;
  background-color: rgba(81, 88, 185, 1.0);
  color: #F2F2F2;
  font-size: 1.1rem;
  font-family: 'Poppins', sans-serif;
  min-width: 100%;
  width: 100%;
}

.person-details .text-input:focus {
  background-color: rgba(81, 88, 185, .8);
}

.person-details .text-input:hover {
  background-color: rgba(81, 88, 185, .9);
}

.person-details input::-webkit-outer-spin-button,
.person-details input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.person-details input[type=number] {
  -moz-appearance: textfield;
}

.gender-details {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
  justify-self: start;
  grid-column: 1/-1;
}

.gender-details .heading {
  font-size: 1rem;
  font-family: 'Rubik', sans-serif;
  font-weight: 600;
}

.gender-details-container {
  display: flex;
  flex-direction: column;
}

.radio-container {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.gender-details .radio {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

input[type='radio'] {
  visibility: hidden;
  margin-right: 0.5rem;
}

input[type='radio']:after {
  width: 20px;
  height: 20px;
  border-radius: 20px;
  position: relative;
  background-color: transparent;
  content: '';
  display: inline-block;
  visibility: visible;
  border: 2px solid rgba(81, 88, 185, 1.0);
  box-sizing: border-box;
}

input[type='radio']:checked:after {
  width: 20px;
  height: 20px;
  border-radius: 20px;
  position: relative;
  background-color: rgba(81, 88, 185, 1.0);
  content: '';
  display: inline-block;
  visibility: visible;
  border: 2px solid rgba(81, 88, 185, 1.0);
  box-sizing: border-box;
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
  justify-self: center;
}

@media (max-width: 768px) {
  .macro-calculator {
    padding-top: 5rem;
    margin-left: 10px;
    margin-right: 10px;
  }
  .person-details {
    grid-template-columns: minmax(0, 1fr);
  }
  .person-details .text-input {
    max-width: calc(100% - 20px) !important;
    min-width: auto;
  }
}
`;

class MacroCalculatorComponent extends HTMLElement {
  personDetails = null;
  gender = 'male';
  constructor() {
    super();

    let shadow = this.attachShadow({ mode: 'open' });

    let content = document.createElement('div');
    content.classList.add('macro-calculator');
    
    let heading = document.createElement('h2');
    heading.innerText = 'Macro Calculator';

    let form = document.createElement('form');
    form.setAttribute('id', 'macro-calculator-form');
    form.setAttribute('action', '');
    form.setAttribute('method', 'get');

    this.personDetails = document.createElement('div');
    this.personDetails.classList.add('person-details');

    let genderDetails = document.createElement('div');
    genderDetails.classList.add('gender-details');
    
    let genderDetailsContainer = document.createElement('div');
    genderDetailsContainer.classList.add('gender-details-container');
    
    let genderDetailsHeading = document.createElement('p');
    genderDetailsHeading.innerText = 'Gender';
    genderDetailsHeading.classList.add('heading');
    
    genderDetailsContainer.appendChild(genderDetailsHeading);
    
    let radioContainer = document.createElement('div');
    radioContainer.classList.add('radio-container');
    
    for (let i = 0; i < 2; i++) {
      let maleOrFemale = i === 0 ? 0 : 1;

      let radioDiv = document.createElement('div');
      radioDiv.classList.add('.radio');

      let radioInput = document.createElement('input');
      radioInput.setAttribute('type', 'radio');
      if (maleOrFemale === 0) {
        radioInput.setAttribute('id', 'male');
        radioInput.setAttribute('name', 'gender');
        radioInput.setAttribute('value', 'male');
        radioInput.setAttribute('checked', 'checked');
      } else {
        radioInput.setAttribute('id', 'female');
        radioInput.setAttribute('name', 'gender');
        radioInput.setAttribute('value', 'female');
      }
      radioInput.addEventListener('click', (ev) => {
        this.genderRadioClickListener(ev.target);
      });

      let radioLabel = document.createElement('label');
      radioLabel.setAttribute('for', maleOrFemale === 0 ? 'male' : 'female');
      radioLabel.innerText = maleOrFemale === 0 ? 'Male' : 'Female';

      radioDiv.append(radioInput, radioLabel);

      radioContainer.appendChild(radioDiv);
    }
    
    genderDetailsContainer.appendChild(radioContainer);
    
    genderDetails.appendChild(genderDetailsContainer);

    this.personDetails.appendChild(genderDetails);

    inputsRequired.forEach((obj) => {
      let container = document.createElement('div');
      container.classList.add('input-container');

      let label = document.createElement('label');
      label.setAttribute('for', obj.id);
      label.innerHTML = obj.name;

      let input = document.createElement('input');
      input.setAttribute('id', obj.id);
      input.setAttribute('name', obj.id);
      input.setAttribute('type', 'number');
      input.setAttribute('required', true);
      input.classList.add('text-input');
      if(obj.id === 'h-c') {
        input.id = 'hip-circumference';
      }
      
      obj.elem = input;

      container.appendChild(label);
      container.appendChild(input);

      this.personDetails.appendChild(container);
    });

    this.personDetails.lastChild.style.display = 'none';

    let button = document.createElement('button');
    button.setAttribute('type', 'submit');
    button.innerText = 'Find!';
    
    

    form.appendChild(this.personDetails);
    form.appendChild(button);

    content.appendChild(heading);
    content.appendChild(form);
    let style = document.createElement('style');
    style.innerHTML = macroCalculatorStyle;

    shadow.appendChild(style);
    shadow.appendChild(content);
  }
  genderRadioClickListener(element) {
    if (element.getAttribute('value') === 'male') {
      this.gender = 'male';
      this.personDetails.lastElementChild.style.display = 'none';
      this.personDetails.lastChild.lastChild.setAttribute('required', false);
    } else if (element.getAttribute('value') === 'female') {
      this.gender = 'female';
      this.personDetails.lastElementChild.style.display = 'block';
      this.personDetails.lastChild.lastChild.setAttribute('required', true);
    }
  }
  calculate() {
    
  }
};

customElements.define('macro-calculator', MacroCalculatorComponent);

export {
  MacroCalculatorComponent
};