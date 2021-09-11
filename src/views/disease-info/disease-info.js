import BaseView from '../baseView.js';
import {
  DiseaseInfoComponent
} from '../../components/disease-info-component/disease-info-component.js';

class DiseaseInfo extends BaseView {
  constructor() {
    super();
    this.setTitle('Whealthier - Disease Info');
  }
  async getHtml() {
    return `<disease-info/>`;
  }
}

export {
  DiseaseInfo
};