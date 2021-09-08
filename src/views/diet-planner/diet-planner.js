import BaseView from '../baseView.js';
import {
  DietPlannerComponent
} from '../../components/diet-planner-component/diet-planner-component.js';

class DietPlanner extends BaseView {
  constructor() {
    super();
    this.setTitle('Whealthier - Diet Planner');
  }
  async getHtml() {
    let htmlString = `
    <diet-planner-component/>
    `;
    return htmlString;
  }
};

export {
  DietPlanner
};