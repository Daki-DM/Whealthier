import BaseView from '../baseView.js';

let macroCalculatorStyle = `
.content {
  padding-top: 5rem;
  margin-left: 4rem;
  margin-right: 4rem;
}

.content h2 {
  font-family: 'Rubik', sans-serif;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .content {
    padding-top: 5rem;
    margin-left: 10px;
    margin-right: 10px;
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
    <div class="content">
      <h2>Macro calculator</h2>
    </div>
    `;
    htmlString += ('<style>' + macroCalculatorStyle + '</style>');
    return htmlString;
  }
};

export {
  MacroCalculator
};