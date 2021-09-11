export default class BaseView {
  constructor() {
    
  }
  // sets the document title to given value
  setTitle(title) { document.title = title; }
  // returns the HTML to render asynchronously
  async getHtml() {
    return '<div>404<br>Nothing to show</div>';
  }
}