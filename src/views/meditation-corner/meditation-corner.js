import BaseView from '../baseView.js';
import {
  MeditationCornerComponent
} from '../../components/meditation-corner-component/meditation-corner-component.js';

class MeditationCornerView extends BaseView {
    constructor() {
        super();
        this.setTitle('Whealthier - Meditation Corner');
    }
    async getHtml() {
        let htmlString = `<meditation-corner-component/>`;
        return htmlString;
    }
}

export {
    MeditationCornerView
};