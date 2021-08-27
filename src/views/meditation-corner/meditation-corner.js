import BaseView from '../baseView.js';

let meditationCornerStyle = `
.cover {
  background-image: linear-gradient(rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.02)),
                    url("https://thumbs.gfycat.com/FrequentDrearyEarthworm-size_restricted.gif");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}
`;

class MeditationCornerView extends BaseView {
  constructor() {
    super();
    this.setTitle('Name - Meditation Corner');
  }
  async getHtml() {
    let htmlString = `
    <div class="cover"></div>
    `;
    htmlString += ('<style>' + meditationCornerStyle + '</style>')
    return htmlString;
  }
}

export {
  MeditationCornerView
};