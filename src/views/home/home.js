import BaseView from '../baseView.js';

class HomeView extends BaseView {
  constructor() {
    super();
    this.setTitle('Name - Home');
  }
  
  async getHtml() {
    return `
    <div>Hello Dumbass Bitch</div>
    `;
  }
};

export {
  HomeView
};