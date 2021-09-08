import BaseView from '../baseView.js';
import {
  MacroCalculatorComponent
} from '../../components/macro-calculator-component/macro-calculator-component.js';

class MacroCalculator extends BaseView {
  constructor() {
    super();
    this.setTitle('Whealthier - Macro Calculator');
  }
  async getHtml() {
    let htmlString = `
    <macro-calculator/>
    `;
    return htmlString;
  }
};

export {
  MacroCalculator
};