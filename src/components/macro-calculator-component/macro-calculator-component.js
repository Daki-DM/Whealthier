import { Person, roundTo2DecimalPlaces } from '../../miscellaneous/person.js'

let inputsRequired = [
  { name: 'Age', id: 'age', elem: null, label: null },
  { name: 'Height', id: 'height', elem: null, label: null },
  { name: 'Weight', id: 'weight', elem: null, label: null },
  { name: 'Neck Circumference', id: 'n-c', elem: null, label: null },
  { name: 'Waist Circumference', id: 'w-c', elem: null, label: null },
  { name: 'Hip Circumference', id: 'h-c', elem: null, label: null },
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
  { name: 'gain', execute: (v) => (-500) },
  { name: 'maintain', execute: (v) => (-0) }
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

let macroImageLinks = [
  { link: 'https://img.icons8.com/ios/100/000000/cake.png' },
  { link: 'https://img.icons8.com/ios/90/000000/fish.png' },
  { link: 'https://img.icons8.com/ios/100/000000/corn.png' }
];

let placeHolderTexts = [
  {
    metric: '',
    imperial: ''
  },
  {
    metric: ' in cm',
    imperial: ' in feet'
  },
  {
    metric: ' in kg',
    imperial: ' in lbs'
  },
  {
    metric: ' in cm',
    imperial: ' in inch'
  },
  {
    metric: ' in cm',
    imperial: ' in inch'
  },
  {
    metric: ' in cm',
    imperial: ' in inch'
  }
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
  font-weight: 600;
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
  justify-content: start;
  align-items: center;
  max-height: 20px;
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
  padding: 0;
  margin: 0;
  margin-right: 10px;
  border-radius: 10px;
}

input[type=radio]:checked {
  background-color: rgba(81, 88, 185, 1.0);
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

.output {
  box-sizing: border-box;
  background-color: #F2F2F2;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 10px;
}

.output-container {
  display: flex;
  min-width: 100%;
}

.output-img-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  min-width: 100%;
  align-items: center;
}

.img-label-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.img-label-container img {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 0 0 8px rgba(31, 38, 135, 0.37);
}

.img-label-container p {
  position: relative;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1rem;
  display: inline-block;
}

.more-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: start;
}

.more-info p {
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1rem;
  display: inline-block;
}

.unit-radio-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  justify-self: start;
  grid-column: 1/-1;
}

.unit-radio-container label {
  border-radius: 10px;
  padding: 10px;
  transition: all 0.3s ease;
}

.unit-radio-container .radio input[type=radio] {
  display: none;
}

.unit-radio-container .radio input[type=radio]:checked + label{
  background-color: rgba(81, 88, 185, 1.0);
  color: #F2F2F2;
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
  .output-img-container {
    flex-direction: column;
    justify-content: center;
  }
  .more-info {
    grid-template-columns: 1fr;
  }
}
`;

class MacroCalculatorComponent extends HTMLElement {
  personDetails = null;
  gender = 'male';
  activityLevelDetails = 'sedentary';
  workoutGoalChoosen = 'loss';
  unit = 0; // metric = 0, imperial = 1
  result = document.createElement('div');
  constructor() {
    super();
    let context = this;

    let shadow = this.attachShadow({ mode: 'open' });

    let content = document.createElement('div');
    content.classList.add('macro-calculator');
    
    let heading = document.createElement('h2');
    heading.innerText = 'Macro Calculator';
    
    this.result.classList.add('output');

    let form = document.createElement('form');
    form.setAttribute('id', 'macro-calculator-form');
    form.setAttribute('action', '');
    form.setAttribute('method', 'get');

    this.personDetails = document.createElement('div');
    this.personDetails.classList.add('person-details');
    
    // input for units (metric or imperial)
    let unitContainer = document.createElement('div');
    
    let unitHeading = document.createElement('p');
    unitHeading.innerText = 'Unit';
    unitHeading.classList.add('heading');
    
    unitContainer.appendChild(unitHeading);
    
    let unitRadioContainer = document.createElement('div');
    unitRadioContainer.classList.add('unit-radio-container');
    
    for(let i = 0; i < 2; i++) {
      // create radio and label
      let radioDiv = document.createElement('div');
      radioDiv.classList.add('radio');
      
      let radio = document.createElement('input');
      radio.setAttribute('type', 'radio');
      radio.setAttribute('name', 'unit');
      
      if(i === 0) {
        radio.setAttribute('id', 'metric');
        radio.setAttribute('value', 'metric');
        radio.setAttribute('checked', true);
      } else if(i === 1) {
        radio.setAttribute('id', 'imperial');
        radio.setAttribute('value', 'imperial');
      }
      
      radio.addEventListener('click', (ev) => {
        this.changeUnits(ev);
      });
      
      let radioLabel = document.createElement('label');
      radioLabel.setAttribute('for', (i === 0 ? 'metric' : 'imperial'));
      radioLabel.innerHTML = (i === 0 ? 'Metric' : 'Imperial');
      
      radioDiv.append(radio, radioLabel);
      
      unitRadioContainer.appendChild(radioDiv);
    }
    
    unitContainer.appendChild(unitRadioContainer);
    
    this.personDetails.appendChild(unitContainer);

    // input for person/user's gender
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
      // create radio and label
      let maleOrFemale = i === 0 ? 0 : 1;

      let radioDiv = document.createElement('div');
      radioDiv.classList.add('radio');

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

    // inputs for age, height, weight, neck, waist and hip
    inputsRequired.forEach((obj, i) => {
      let container = document.createElement('div');
      container.classList.add('input-container');

      let label = document.createElement('label');
      label.setAttribute('for', obj.id);
      label.innerHTML = (obj.name + placeHolderTexts[i][this.unit === 0 ? 'metric' : 'imperial'])

      let input = document.createElement('input');
      input.setAttribute('id', obj.id);
      input.setAttribute('name', obj.id);
      input.setAttribute('type', 'number');
      input.setAttribute('required', true);
      input.setAttribute('step', 0.001);
      input.classList.add('text-input');
      
      obj.elem = input;
      obj.label = label;

      container.appendChild(label);
      container.appendChild(input);

      this.personDetails.appendChild(container);
    });
    
    // input for person/user's workout goal
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
      radioDiv.classList.add('radio');

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
    
    // input for person/user's activity level
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
      radioDiv.classList.add('radio');

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
    
    // handle submit event
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      this.calculate();
      this.result.style.padding = '20px';
    });

    form.appendChild(this.personDetails);
    form.appendChild(button);

    content.appendChild(heading);
    content.appendChild(this.result);
    content.appendChild(form);
    let style = document.createElement('style');
    style.innerHTML = macroCalculatorStyle;

    shadow.appendChild(style);
    shadow.appendChild(content);
  }
  // function to handle unit change
  changeUnits(ev) {
    if(ev.target.getAttribute('value') === 'metric') this.unit = 0;
    else if(ev.target.getAttribute('value') === 'imperial') this.unit = 1;
    inputsRequired.forEach((input, i) => {
      input.label.innerHTML = (input.name + placeHolderTexts[i][this.unit === 0 ? 'metric' : 'imperial'])
    });
  }
  genderRadioClickListener(element) {
    if (element.getAttribute('value') === 'male') {
      this.gender = 'male';
    } else if (element.getAttribute('value') === 'female') {
      this.gender = 'female';
    }
  }
  // calculates results based on given inputs
  calculate() {
    let age = inputsRequired[0].elem.value;
    let height = inputsRequired[1].elem.value;
    let weight = inputsRequired[2].elem.value;
    let neckCircumference = inputsRequired[3].elem.value;
    let waistCircumference = inputsRequired[4].elem.value;
    let hipCircumference = inputsRequired[5].elem?.value;
    
    let person = new Person();
    
    let feetToCMFactor = 30.48; // *
    let poundsToKGFactor = 2.205; // /
    let inchesToCMFactor = 2.54; // *
    
    person.age = age;
    person.height = height;
    person.weight = weight;
    person.neckCircumference = neckCircumference;
    person.waistCircumference = waistCircumference;
    person.hipCircumference = hipCircumference;

    if(this.unit === 1) {
      person.height = height * feetToCMFactor;
      person.weight = weight / poundsToKGFactor;
      person.neckCircumference = neckCircumference * inchesToCMFactor;
      person.waistCircumference = waistCircumference * inchesToCMFactor;
      person.hipCircumference = hipCircumference * inchesToCMFactor;
    }
    
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
    let carb = Math.round(valueFromPercentage(calorieBasedOnGoal, macroValuesBasedOnGoal.carb)/4);
    let protein = Math.round(valueFromPercentage(calorieBasedOnGoal, macroValuesBasedOnGoal.protein)/4);
    let fat = Math.round(valueFromPercentage(calorieBasedOnGoal, macroValuesBasedOnGoal.fat)/9);
    
    this.renderOutput(
      bodyMassIndex,
      bodyFatPercentage,
      dailyCalorieIntake,
      activityLevelBmr,
      carb,
      protein,
      fat
    );
  }
  // render the output on to the screen
  renderOutput(
    bmi,
    bfp,
    dci,
    bmr,
    carb,
    protein,
    fat
  ) {
    this.result.innerHTML = '';
    let container = document.createElement('div');
    container.classList.add('output-container');
    
    let imgContainer = document.createElement('div');
    imgContainer.classList.add('output-img-container');
    
    macroImageLinks.forEach((v, i) => {
      let img = document.createElement('img');
      img.src = v.link;
      img.classList.add('output-img');
      
      let label = document.createElement('p');
      label.classList.add('output-macro-label');
      
      if(i === 2) {
        label.innerText = `${carb}g Carbs/day`;
      } else if(i === 1) {
        label.innerText = `${protein}g Protein/day`;
      } else if(i === 0) {
        label.innerText = `${fat}g Fat/day`;
      }
      
      let imgLabelContainer = document.createElement('div');
      imgLabelContainer.classList.add('img-label-container');
      
      imgLabelContainer.append(img, label);
      imgContainer.appendChild(imgLabelContainer);
    });
    container.appendChild(imgContainer);
    
    let moreInfo = document.createElement('div');
    moreInfo.classList.add('more-info');
    
    let bmiText = document.createElement('p');
    bmiText.innerText = `Body Mass Index: ${roundTo2DecimalPlaces(bmi)}`;
    
    let bfpText = document.createElement('p');
    bfpText.innerText = `Body Fat Percentage: ${roundTo2DecimalPlaces(bfp)}%`;
    
    let dciText = document.createElement('p');
    dciText.innerText = `Daily Calorie Intake: ${roundTo2DecimalPlaces(dci)} calories`;
    
    let bmrText = document.createElement('p');
    bmrText.innerText = `Basal Metabolic Rate: ${roundTo2DecimalPlaces(bmr)} calories/day`;
    
    moreInfo.append(
      bmiText,
      bfpText,
      dciText,
      bmrText
    );
    
    this.result.append(container, moreInfo);
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
};

customElements.define('macro-calculator', MacroCalculatorComponent);

export {
  MacroCalculatorComponent
};