import BaseView from '../baseView.js';
import { MeditationCornerComponent } from '../../components/meditation-corner-component/meditation-corner-component.js'; 


class MeditationCornerView extends BaseView {
    constructor() {
        super();
        this.setTitle('Name - Meditation Corner');
    }
    async getHtml() {
        return '<meditation-corner-component/>';
        return htmlString;
    }
}

export {
    MeditationCornerView
};