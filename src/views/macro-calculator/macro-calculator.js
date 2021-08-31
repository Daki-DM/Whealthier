import BaseView from '../baseView.js';

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
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  gap: 10px 0;
  width: 100%;
  justify-content: space-evenly;
}

.input-container {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: start;
  max-width: 100%;
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
  input {
    max-width: calc(100% - 20px) !important;
  }
}
`;

class MacroCalculator extends BaseView {
  constructor() {
    super();
    this.setTitle('Name - Macro Calculator');
  }
  async getHtml() {
    let htmlString = `
    <div class="macro-calculator">
      <h2>Macro calculator</h2>
      <div class="content">
        <form>
          <div class="person-details">
            <div class="input-container">
              <label for="age">Age</label>
              <input type="number" id="age"/>
            </div>
            <div class="input-container">
              <label for="height">Height</label>
              <input type="number" id="height"/>
            </div>
            <div class="input-container">
              <label for="weight">Width</label>
              <input type="number" id="weight"/>
            </div>
            <div class="input-container">
              <label for="n-c">Neck circumference</label>
              <input type="number" id="n-c"/>
            </div>
          </div>
          <div class="gender-details">
          </div>
          <button type="submit">Find!</button>
        </form>
      </div>
    </div>
    `;
    htmlString += ('<style>' + macroCalculatorStyle + '</style>');
    return htmlString;
  }
};

export {
  MacroCalculator
};