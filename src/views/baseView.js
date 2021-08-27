export default class BaseView {
  constructor() {
    
  }
  setTitle(title) { document.title = title; }
  async getHtml() {
    return '<div>404<br>Nothing to show</div>';
  }
}