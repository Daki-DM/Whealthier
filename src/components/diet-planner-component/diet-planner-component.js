let dietPlanData = [
  { name: 'Weekly', value: 'weekly' },
  { name: 'Daily', value: 'daily' }
];

let healthPreference = [
  { name: 'Vegan', value: 'vegan' },
  { name: 'Vegetarian', value: 'vegetarian' },
  { name: 'Alcohol Free', value: 'alcohol-free' },
  { name: 'Peanut Free', value: 'peanut-free' },
  { name: 'No Sugar', value: 'low-sugar' },
  { name: 'Egg Free', value: 'egg-free' },
  { name: 'Fish Free', value: 'fish-free' },
  { name: 'Dairy Free', value: 'dairy-free' },
  { name: 'Gluten Free', value: 'gluten-free' },
];

let dietPreferences = [
  { name: 'Balanced Diet', value: 'balanced' },
  { name: 'High Fiber', value: 'high-fiber' },
  { name: 'High Protein', value: 'high-protein' },
  { name: 'Low Carb', value: 'low-carb' },
  { name: 'Low Fat', value: 'low-fat' },
  { name: 'Low Sodium', value: 'low-sodium' }
];

let dietPlannerStyle = `
.diet-planner {
  padding-top: 5rem;
  margin-left: 4rem;
  margin-right: 4rem;
  padding-bottom: 4rem;
}

.diet-planner h2 {
  font-family: 'Rubik', sans-serif;
  margin-bottom: 1rem;
}

form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px 30px;
  justify-items: stretch;
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  outline: 0;
  background-color: rgba(81, 88, 185, 1.0);
  box-sizing: border-box;
  padding: 5px 10px;
  font-size: 1.1rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  min-width: 100%;
  width: 100%;
  color: #F2F2F2;
  border-radius: 10px;
  border: 1px solid rgba(81, 88, 185, 1.0);
  position: relative;
  background-image: url("data:image/svg+xml;utf8,<svg viewBox='0 0 140 140' width='24' height='24' xmlns='http://www.w3.org/2000/svg'><g><path d='m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z' fill='white'/></g></svg>");
  background-repeat: no-repeat, repeat;
  background-position: right .7em top 50%, 0 0;
  background-size: .65em auto, 100%;
  height: 2.5rem;
}

select::-ms-expand {
  display: none;
}

.input-label-container {
  display: flex;
  flex-direction: column;
  max-width: 100%;
}

.input-label-container label {
  font-family: 'Rubik', sans-serif;
  font-weight: 600;
}

.checkbox-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: max-content;
}

input[type=checkbox] {
  height: 20px;
  width: 20px;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  border-radius: 4px;
  outline: none;
  transition-duration: 0.1s;
  border: 2px solid rgba(81, 88, 185, 1.0);
  background-color: transparent;
  cursor: pointer;
  margin-right: 10px;
}

input[type=checkbox]:checked {
  background-color: rgba(81, 88, 185, 1.0);
}

input[type='radio'] {
  visibility: hidden;
  margin-right: 0.5rem;
  margin-right: 13px;
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

.input-label-radio-container {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

@media (max-width: 768px) {
  .diet-planner {
    padding-top: 5rem;
    margin-left: 10px;
    margin-right: 10px;
  }
  form {
    grid-template-columns: 1fr;
  }
}
`;

class DietPlannerComponent extends HTMLElement {
  mealCount = 3;
  dietPlan = 'weekly';
  healthLabels = new Set();
  dietPreference = 'balanced';
  constructor() {
    super();

    let shadow = this.attachShadow({ mode: 'open' });

    let content = document.createElement('div');
    content.classList.add('diet-planner');

    let heading = document.createElement('h2');
    heading.innerText = 'Diet Planner';

    content.appendChild(heading);

    // form
    let form = document.createElement('form');
    
    let noOfMealsContainer = document.createElement('div');
    noOfMealsContainer.classList.add('input-label-container');
    let noOfMealsSpinner = document.createElement('select');
    noOfMealsSpinner.setAttribute('name', 'no-meal-spinner')
    noOfMealsSpinner.setAttribute('id', 'no-meal-select');
    [
      {name: '3', value: '3'},
      {name: '4', value: '4'},
      {name: '5', value: '5'},
    ].forEach(plan => {
      let option = document.createElement('option');
      option.setAttribute('value', plan.value);
      option.innerText = plan.name;
      noOfMealsSpinner.appendChild(option);
    });
    let noOfMealsLabel = document.createElement('label');
    noOfMealsLabel.innerHTML = 'Number of meals a day';
    noOfMealsLabel.setAttribute('for', 'no-meal-select');
    noOfMealsContainer.append(noOfMealsLabel, noOfMealsSpinner);
    

    let dietPlanSpinnerContainer = document.createElement('div');
    dietPlanSpinnerContainer.classList.add('input-label-container');
    let dietPlanSpinner = document.createElement('select');
    dietPlanSpinner.setAttribute('name', 'diet-planner-spinner')
    dietPlanSpinner.setAttribute('id', 'diet-plan-select');
    dietPlanData.forEach(plan => {
      let option = document.createElement('option');
      option.setAttribute('value', plan.value);
      option.innerText = plan.name;
      dietPlanSpinner.appendChild(option);
    });
    let dietPlanLabel = document.createElement('label');
    dietPlanLabel.innerHTML = 'Diet Plan';
    dietPlanLabel.setAttribute('for', 'diet-plan-select');
    dietPlanSpinnerContainer.append(dietPlanLabel, dietPlanSpinner);
    
    
    let healthLabelContainer = document.createElement('div');
    healthLabelContainer.classList.add('input-label-container');
    let healthLabelCheckBoxContainer = document.createElement('div');
    healthPreference.forEach(preference => {
      let checkBoxContainer = document.createElement('div');
      checkBoxContainer.classList.add('checkbox-container');
      
      let checkBox = document.createElement('input');
      checkBox.setAttribute('type', 'checkbox');
      checkBox.setAttribute('id', preference.value);
      checkBox.classList.add('checkbox');
      
      let checkBoxLabel = document.createElement('label');
      checkBoxLabel.innerHTML = preference.name;
      checkBoxLabel.setAttribute('for', preference.value);
      
      checkBoxContainer.append(checkBox, checkBoxLabel);
      healthLabelCheckBoxContainer.appendChild(checkBoxContainer);
    });
    let healthLabelLabel = document.createElement('label');
    healthLabelLabel.innerHTML = 'Health Label';
    healthLabelContainer.append(healthLabelLabel, healthLabelCheckBoxContainer);
    
    let dietLabelContainer = document.createElement('div');
    dietLabelContainer.classList.add('input-label-container');
    let dietLabelRadioContainer = document.createElement('div');
    dietLabelRadioContainer.classList.add('input-label-radio-container');
    dietPreferences.forEach((preference, i) => {
      let radioContainer = document.createElement('div');
      radioContainer.classList.add('radio-container');
      
      let radioBox = document.createElement('input');
      radioBox.setAttribute('type', 'radio');
      radioBox.setAttribute('name', 'diet-label');
      radioBox.setAttribute('id', preference.value);
      radioBox.setAttribute('value', preference.value);
      if(i === 0) radioBox.setAttribute('checked', true);
      
      let radioBoxLabel = document.createElement('label');
      radioBoxLabel.innerHTML = preference.name;
      radioBoxLabel.setAttribute('for', preference.value);
      
      radioContainer.append(radioBox, radioBoxLabel);
      dietLabelRadioContainer.appendChild(radioContainer);
    });
    let dietLabelLabel = document.createElement('label');
    dietLabelLabel.innerHTML = 'Diet Label';
    dietLabelContainer.append(dietLabelLabel, dietLabelRadioContainer);


    form.append(
      noOfMealsContainer,
      dietPlanSpinnerContainer,
      healthLabelContainer,
      dietLabelContainer
    );
    
    content.appendChild(form);

    let style = document.createElement('style');
    style.innerHTML = dietPlannerStyle;
    content.appendChild(style);

    shadow.appendChild(content);
  }
}

customElements.define('diet-planner-component', DietPlannerComponent);

export {
  DietPlannerComponent
};