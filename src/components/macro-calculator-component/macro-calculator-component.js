import { Person, roundTo2DecimalPlaces } from '../../miscellaneous/person.js'

let inputsRequired = [
  { name: 'Age', id: 'age', elem: null },
  { name: 'Height', id: 'height', elem: null},
  { name: 'Weight', id: 'weight', elem: null},
  { name: 'Neck Circumference', id: 'n-c', elem: null},
  { name: 'Waist Circumference', id: 'w-c', elem: null},
  { name: 'Hip Circumference', id: 'h-c', elem: null},
];

let activityLevel = [
  { name: 'sedentary', value: 1.2 },
  { name: 'lightlyActive', value: 1.375 },
  { name: 'moderatelyActive', value: 1.550 },
  { name: 'veryActive', value: 1.725 },
  { name: 'extraActive', value: 1.9 }
];

let activityLevelInputRequired = [
  { name: 'Sedentary', id: 'sedentary', desc: 'Little to no exercise' },
  { name: 'Light Activity', id: 'lightlyActive', desc: 'Light Exercise/Sports 3-5 days a week' },
  { name: 'Moderate Activity', id: 'moderatelyActive', desc: 'Moderate Exercise/Sports 3-5 days a week' },
  { name: 'Very Active', id: 'veryActive', desc: 'Hard Exercise/Sports 6-7 days a week' },
  { name: 'Extra Active', id: 'extraActive', desc: 'Hard Exercise/Sports 6-7 days a week and physical job'}
];

let workoutGoal = [
  { name: 'loss', execute: (v) => { return ((v * 19) / 100)} },
  { name: 'gain', execute: (v) => { return (v + 500) }},
  { name: 'maintain', execute: (v) => { return (v * 1) }}
];

let goalInputRequired = [
  { name: 'Weight Loss', id: 'loss' },
  { name: 'Weight Gain', id: 'gain' },
  { name: 'Maintain Weight', id: 'maintain' },
];

let macroForWorkoutGoal = [
  { name: 'loss', carb: 40, protein: 40, fat: 20},
  { name: 'gain', carb: 40, protein: 30, fat: 30},
  { name: 'maintain', carb: 40, protein: 30, fat: 30}
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

.heading {
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

.workout-goal .radio-container,
.activity-level .radio-container {
  flex-direction: column;
}

.radio {
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
  justify-self: start;
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
  activityLevelDetails = 'sedentary';
  workoutGoalChoosen = 'loss';
  constructor() {
    super();
    let context = this;

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
      input.setAttribute('step', 0.1);
      input.classList.add('text-input');
      
      obj.elem = input;

      container.appendChild(label);
      container.appendChild(input);

      this.personDetails.appendChild(container);
    });
    
    let workoutGoalDetails = document.createElement('div');
    workoutGoalDetails.classList.add('workout-goal');
    
    let workoutGoalContainer = document.createElement('div');
    workoutGoalContainer.classList.add('workout-goal-container');
    
    let workoutGoalDetailsHeading = document.createElement('p');
    workoutGoalDetailsHeading.innerText = 'Workout Goal';
    workoutGoalDetailsHeading.classList.add('heading');
    
    workoutGoalContainer.appendChild(workoutGoalDetailsHeading);
    
    let workoutGoalRadioContainer = document.createElement('div');
    workoutGoalRadioContainer.classList.add('radio-container');
    
    goalInputRequired.forEach((obj, index) => {
      let radioDiv = document.createElement('div');
      radioDiv.classList.add('.radio');

      let radioInput = document.createElement('input');
      radioInput.setAttribute('type', 'radio');
      radioInput.setAttribute('id', obj.id);
      radioInput.setAttribute('name', 'goal');
      radioInput.setAttribute('value', obj.id);
      
      if(index === 0) radioInput.setAttribute('checked', 'checked');
      radioInput.addEventListener('click', (ev) => {
        context.workoutGoalChoosen = ev.target.getAttribute('id');
      });
      
      let radioLabel = document.createElement('label');
      radioLabel.setAttribute('for', obj.id);
      radioLabel.innerText = obj.name;

      radioDiv.append(radioInput, radioLabel);

      workoutGoalRadioContainer.appendChild(radioDiv);
    });
    
    workoutGoalContainer.appendChild(workoutGoalRadioContainer);
    workoutGoalDetails.appendChild(workoutGoalContainer);
    
    this.personDetails.appendChild(workoutGoalDetails);
    
    let activityLevelDetails = document.createElement('div');
    activityLevelDetails.classList.add('activity-level');
    
    let activityLevelContainer = document.createElement('div');
    activityLevelContainer.classList.add('activity-level-container');
    
    let activityLevelDetailsHeading = document.createElement('p');
    activityLevelDetailsHeading.innerText = 'Activity Level';
    activityLevelDetailsHeading.classList.add('heading');
    
    activityLevelContainer.appendChild(activityLevelDetailsHeading);
    
    let activityLevelRadioContainer = document.createElement('div');
    activityLevelRadioContainer.classList.add('radio-container');
    
    activityLevelInputRequired.forEach((obj, index) => {
      let radioDiv = document.createElement('div');
      radioDiv.classList.add('.radio');

      let radioInput = document.createElement('input');
      radioInput.setAttribute('type', 'radio');
      radioInput.setAttribute('id', obj.id);
      radioInput.setAttribute('name', 'activity-level');
      radioInput.setAttribute('value', obj.id);
      
      if(index === 0) radioInput.setAttribute('checked', 'checked');
      radioInput.addEventListener('click', (ev) => {
        context.activityLevelDetails = ev.target.getAttribute('id');
      });
      
      let radioLabel = document.createElement('label');
      radioLabel.setAttribute('for', obj.id);
      radioLabel.innerText = obj.name;

      radioDiv.append(radioInput, radioLabel);

      activityLevelRadioContainer.appendChild(radioDiv);
    });
    
    activityLevelContainer.appendChild(activityLevelRadioContainer);
    activityLevelDetails.appendChild(activityLevelContainer);
    
    this.personDetails.appendChild(activityLevelDetails);

    let button = document.createElement('button');
    button.setAttribute('type', 'submit');
    button.innerText = 'Find!';
    
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      this.calculate()
    });

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
    } else if (element.getAttribute('value') === 'female') {
      this.gender = 'female';
    }
  }
  calculate() {
    let age = inputsRequired[0].elem.value;
    let height = inputsRequired[1].elem.value;
    let weight = inputsRequired[2].elem.value;
    let neckCircumference = inputsRequired[3].elem.value;
    let waistCircumference = inputsRequired[4].elem.value;
    let hipCircumference = 0;
    
    let person = new Person();
    
    if(this.gender === 'female') {
      hipCircumference = inputsRequired[5].elem.value;
    }
    
    person.age = age;
    person.height = height;
    person.weight = weight;
    person.neckCircumference = neckCircumference;
    person.waistCircumference = waistCircumference;
    person.hipCircumference = hipCircumference;
    
    if(this.gender === 'male') {
      person.gender = 0;
    } else if(this.gender === 'female') {
      person.gender = 1;
    }
    
    let bodyMassIndex = person.findBMI();
    let bodyFatPercentage = person.findBodyFatPercentage();
    let dailyCalorieIntake = person.findDailyCalorieIntake();
    let bmr = person.findBMR(dailyCalorieIntake);
    let activityLevelBmr = bmr * activityLevel.find(lvl => lvl.name === this.activityLevelDetails).value;
    
    function valueFromPercentage(v, p) {
      return ((v * p) / 100);
    }
    
    let calorieBasedOnGoal = activityLevelBmr - workoutGoal.find(goal => goal.name === this.workoutGoalChoosen).execute(activityLevelBmr);
    let macroValuesBasedOnGoal = macroForWorkoutGoal.find(goal => goal.name === this.workoutGoalChoosen);
    let carb = roundTo2DecimalPlaces(valueFromPercentage(calorieBasedOnGoal, macroValuesBasedOnGoal.carb)/4);
    let protein = roundTo2DecimalPlaces(valueFromPercentage(calorieBasedOnGoal, macroValuesBasedOnGoal.protein)/4);
    let fat = roundTo2DecimalPlaces(valueFromPercentage(calorieBasedOnGoal, macroValuesBasedOnGoal.fat)/9);
  }
};

customElements.define('macro-calculator', MacroCalculatorComponent);

export {
  MacroCalculatorComponent
};