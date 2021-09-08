import BaseView from '../baseView.js';

let aboutViewStyle = `
.about {
  padding-top: 5rem;
  margin-left: 4rem;
  margin-right: 4rem;
  padding-bottom: 4rem;
}

.about h2 {
  font-family: 'Rubik', sans-serif;
  margin-bottom: 1rem;
}

.about .container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.about .container p {
  font-family: 'Rubik', sans-serif;
  line-height: 1.5;
}

.about .container img {
  max-width: 50%;
}

.product {
  font-weight: 600;
}

.about .c-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  gap: 2rem;
}

.about .c-container .c-card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 300px;
  padding: 20px;
  background-color: rgba(255, 255, 255, .9);
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

.about .c-container .c-card img {
  border-radius: 50%;
  width: 100px;
}

.about .c-container .c-card h3 {
  font-family: 'Poppins', sans-serif;
  padding-top: .5rem;
}

.about .c-container .c-card p {
  padding-top: 2rem;
  font-family: 'Rubik', sans-serif;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .about .container {
    flex-direction: column;
  }
  .about {
    padding-top: 5rem;
    margin-left: 10px;
    margin-right: 10px;
    padding-bottom: 2rem;
  }
  .about .container img {
    max-width: 100%;
  }
  .about .c-container {
    flex-direction: column;
    justify-content: center;
  }
}
`;

class AboutView extends BaseView {
  constructor() {
    super();
    this.setTitle('Whealthier - About');
  }
  async getHtml() {
    let htmlString = `
    <div class="about">
      <h2>About</h2>
      <div class="container">
        <p>
          <span class="product">Whealthier</span> is a platform that can make your day
          healthy. At <span class="product">Whealthier</span> we offer many features
          from a diet planner to a meditation corner. <span class="product">Whealthier
          </span> is made in such a way that it can be used across almost all
          devices. <span class="product">Be healthy, Be happy!</span>
        </p>
        <img src="https://ik.imagekit.io/pzrj7oa3hsd/timathon-health/about-us_cj2VFvDrc.png?updatedAt=1630244931913"/>
      </div>
      <section-break></section-break>
      <h2>Contributors</h2>
      <div class="c-container">
        <div class="c-card">
          <img src="https://github.com/codingwith3dv.png"/>
          <h3>Coding With 3DV</h3>
          <p>
            I'm a 14 year-old high school student and a full-stack web
            developer. Coding is one my favourite field of interest. 
            I usually use C/C++ and Typescript/Javascript everytime.
          </p>
        </div>
        <div class="c-card">
          <img src="https://github.com/daki-DM.png"/>
          <h3>Daki</h3>
          <p>
            I'm a 14 year-old from Slovenia. And I am a frontend web developer.
            I am very passionate on programming and I usually use HTML/CSS/Javascript
            and Python everytime.
          </p>
        </div>
      </div>
    </div>
    `;
    htmlString += ('<style>' + aboutViewStyle + '</style>');
    return htmlString;
  }
};

export {
  AboutView
};