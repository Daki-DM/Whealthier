import {
  getDietPlan
} from '../../miscellaneous/getDietPlan.js';

let dietPlanData = [
  { name: 'Weekly', value: '7' },
  { name: 'Daily', value: '1' }
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
  box-sizing: border-box;
  flex-direction: column;
  align-items: start;
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
  height: 20px;
  margin-top: 10px;
}

.radio-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: max-content;
  height: 20px;
  margin-top: 10px;
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

input[type=radio] {
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
  border-radius: 10px;
}

input[type=radio]:checked {
  background-color: rgba(81, 88, 185, 1.0);
}

.input-label-radio-checkbox-container {
  display: flex;
  flex-direction: column;
  justify-content: start;
}

input[type=number] {
  height: 2rem;
  border-radius: 10px;
  border: none;
  outline: none;
  padding: 5px 10px;
  background-color: rgba(81, 88, 185, 1.0);
  color: #F2F2F2;
  font-size: 1.1rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  width: 100%;
  min-width: 100%;
}

input[type=number]:focus {
  background-color: rgba(81, 88, 185, .8);
}

input[type=number]:hover {
  background-color: rgba(81, 88, 185, .9);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

.output {
  width: 100%;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  background-color: #F2F2F2;
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  box-sizing: border-box;
  gap: 20px;
}

.diet-card {
  border-radius: 10px;
  background-color: #F2F2F2;
  box-shadow: 0 0 8px rgba(31, 38, 135, 0.37);
  padding: 10px;
  box-sizing: border-box;
  max-width: 100%;
}

.diet-card h3 {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  margin-bottom: 1rem;
}

.diet-card img {
  max-width: 100%;
  min-width: 100%;
  border-radius: 10px;
}

.diet-card p {
  font-family: 'Rubik', sans-serif;
  font-size: 0.95rem;
  margin: 0;
}

.diet-card ul {
  list-style: none;
  font-family: 'Rubik', sans-serif;
  font-size: 0.95rem;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  position: relative;
  gap: 5px;
}

.diet-card ul li {
  position: relative;
  padding-left: calc(0.95rem + 5px);
}

.diet-card ul li:before {
  content: '';
  height: 0.95rem;
  width: 0.95rem;
  background-color: rgba(81, 88, 185, 1.0);
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  inset: 0;
}

.diet-card .list-label {
  margin-top: 10px;
  font-family: 'Poppins', sans-serif;
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
  justify-self: start;
  cursor: pointer;
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
  input[type=number] {
    max-width: calc(100% - 20px) !important;
    min-width: auto;
  }
  .output {
    grid-template-columns: 1fr;
  }
}
`;

class DietPlannerComponent extends HTMLElement {
  mealCount = 'three';
  calories = 1800;
  healthLabels = new Set();
  dietPreference = 'balanced';
  output = document.createElement('div');
  constructor() {
    super();

    let shadow = this.attachShadow({ mode: 'open' });

    let content = document.createElement('div');
    content.classList.add('diet-planner');
    
    let heading = document.createElement('h2');
    heading.innerText = 'Diet Planner';

    content.appendChild(heading);
    
    this.output.classList.add('output');
    content.appendChild(this.output);

    // form
    let form = document.createElement('form');
    
    let noOfMealsContainer = document.createElement('div');
    noOfMealsContainer.classList.add('input-label-container');
    let noOfMealsSpinner = document.createElement('select');
    noOfMealsSpinner.setAttribute('name', 'no-meal-spinner')
    noOfMealsSpinner.setAttribute('id', 'no-meal-select');
    [
      {name: '3', value: 'three'},
      {name: '4', value: 'four'},
      {name: '5', value: 'five'},
    ].forEach(plan => {
      let option = document.createElement('option');
      option.setAttribute('value', plan.value);
      option.innerText = plan.name;
      noOfMealsSpinner.appendChild(option);
    });
    noOfMealsSpinner.addEventListener('change', (ev) => {
      ev.preventDefault();
      this.mealCount = noOfMealsSpinner.options[noOfMealsSpinner.selectedIndex].value;
    });
    let noOfMealsLabel = document.createElement('label');
    noOfMealsLabel.innerHTML = 'Number of meals a day';
    noOfMealsLabel.setAttribute('for', 'no-meal-select');
    noOfMealsContainer.append(noOfMealsLabel, noOfMealsSpinner);
    

    let calorieInputContainer = document.createElement('div');
    calorieInputContainer.classList.add('input-label-container');
    let calorieInput = document.createElement('input');
    calorieInput.setAttribute('name', 'calorie-input')
    calorieInput.setAttribute('id', 'calorie-input');
    calorieInput.setAttribute('type', 'number');
    calorieInput.setAttribute('required', true);
    calorieInput.setAttribute('step', '1');
    calorieInput.setAttribute('value', 1900);
    calorieInput.addEventListener('change', (ev) => {
      ev.preventDefault();
      this.calories = parseInt(calorieInput.value);
    });
    let calorieLabel = document.createElement('label');
    calorieLabel.innerHTML = 'Calories (Recommended: 1700 - 2400)';
    calorieLabel.setAttribute('for', 'calorie-input');
    calorieInputContainer.append(calorieLabel, calorieInput);
    
    
    let healthLabelContainer = document.createElement('div');
    healthLabelContainer.classList.add('input-label-container');
    let healthLabelCheckBoxContainer = document.createElement('div');
    healthLabelCheckBoxContainer.classList.add('input-label-radio-checkbox-container');
    healthPreference.forEach(preference => {
      let checkBoxContainer = document.createElement('div');
      checkBoxContainer.classList.add('checkbox-container');
      
      let checkBox = document.createElement('input');
      checkBox.setAttribute('type', 'checkbox');
      checkBox.setAttribute('id', preference.value);
      checkBox.classList.add('checkbox');
      
      checkBox.addEventListener('change', (ev) => {
        ev.preventDefault();
        let value = ev.target.getAttribute('id');
        if(ev.target.checked) {
          this.healthLabels.add(value);
        } else {
          if(this.healthLabels.has(value)) this.healthLabels.delete(value);
        }
      });
      
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
    dietLabelRadioContainer.classList.add('input-label-radio-checkbox-container');
    dietPreferences.forEach((preference, i) => {
      let radioContainer = document.createElement('div');
      radioContainer.classList.add('radio-container');
      
      let radioBox = document.createElement('input');
      radioBox.setAttribute('type', 'radio');
      radioBox.setAttribute('name', 'diet-label');
      radioBox.setAttribute('id', preference.value);
      radioBox.setAttribute('value', preference.value);
      if(i === 0) radioBox.setAttribute('checked', true);
      radioBox.addEventListener('click', (ev) => {
        this.dietPreference = ev.target.getAttribute('id');
      });
      
      let radioBoxLabel = document.createElement('label');
      radioBoxLabel.innerHTML = preference.name;
      radioBoxLabel.setAttribute('for', preference.value);
      
      radioContainer.append(radioBox, radioBoxLabel);
      dietLabelRadioContainer.appendChild(radioContainer);
    });
    let dietLabelLabel = document.createElement('label');
    dietLabelLabel.innerHTML = 'Diet Label';
    dietLabelContainer.append(dietLabelLabel, dietLabelRadioContainer);
    
    let button = document.createElement('button');
    button.setAttribute('type', 'submit');
    button.innerText = 'Get Plan';

    form.append(
      noOfMealsContainer,
      calorieInputContainer,
      healthLabelContainer,
      dietLabelContainer,
      button
    );
    
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      this.calculate();
      this.output.style.padding = '20px';
      this.output.style.marginBottom = '20px';
      window.scrollTo({top: 0, behavior: 'smooth'});
    });
    
    content.appendChild(form);

    let style = document.createElement('style');
    style.innerHTML = dietPlannerStyle;
    content.appendChild(style);

    shadow.appendChild(content);
  }
  calculate() {
    getDietPlan(
      {
        calories: this.calories,
        mealCount: this.mealCount,
        healthPreferences: Array.from(this.healthLabels),
        diet: this.dietPreference
      }
    )
    .then(v => v.json())
    .then(v => {
      let recipes = [];
      v.forEach(data => {
        let recipe = data[0].recipe;
        recipes.push(recipe);
      });
      this.renderOutput(recipes);
    });
  }
  renderOutput(recipes) {
    this.output.innerHTML = '';
    recipes.forEach(recipe => {
      let label = recipe.label;
      let calories = recipe.calories;
      let image = recipe.image;
      let healthLabels = recipe.healthLabels;
      let mealTypes = recipe.mealType;
      let cuisineTypes = recipe.cuisineType;
      let dishTypes = recipe.dishType;
      let ingredients = recipe.ingredientLines;
      
      let dietCard = document.createElement('div');
      dietCard.classList.add('diet-card');
      
      let recipeName = document.createElement('h3');
      recipeName.innerText = label;
      
      let recipeImage = document.createElement('img');
      recipeImage.src = image;
      
      let recipeCal = document.createElement('p');
      recipeCal.innerText = `Calories: ${Math.round(calories)}`;
      
      let recipeMealType = document.createElement('p');
      recipeMealType.innerText = `Meal Type: ${(mealTypes && mealTypes.length) > 0 ? mealTypes.slice(0, 3).join(', ') : 'Unknown'}`;
      
      let recipeCuisineType = document.createElement('p');
      recipeCuisineType.innerText = `Cuisine Type: ${(cuisineTypes && cuisineTypes.length) > 0 ? cuisineTypes.slice(0, 3).join(', ') : 'Unknown'}`;
      
      let recipeDishType = document.createElement('p');
      recipeDishType.innerText = `Dish Type: ${(dishTypes && dishTypes.length) > 0 ? dishTypes.slice(0, 3).join(', ') : 'Unknown'}`;
      
      let ingredientListLabel = document.createElement('p');
      ingredientListLabel.classList.add('list-label');
      ingredientListLabel.innerText = 'Ingredients';
      let ingredientList = document.createElement('ul');
      ingredients.forEach(v => {
        let li = document.createElement('li');
        li.innerText = v.toString();
        ingredientList.appendChild(li);
      });
      
      dietCard.append(
        recipeImage,
        recipeName,
        recipeCal,
        recipeMealType,
        recipeCuisineType,
        recipeDishType,
        ingredientListLabel,
        ingredientList
      );

      this.output.appendChild(dietCard);
    });
  }
}

customElements.define('diet-planner-component', DietPlannerComponent);

export {
  DietPlannerComponent
};