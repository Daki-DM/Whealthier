import BaseView from '../baseView.js';

let homeViewStyle = `
.home {
  padding-top: 3rem;
  margin-left: 4rem;
  margin-right: 4rem;
  padding-bottom: 4rem;
}

.landing-section {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
}

.landing-section .hero-text {
  width: 100%;
  font-weight: 900;
  font-size: 2.5rem;
  font-family: 'Poppins', sans-serif;
}

.landing-section .hero-text .hero-description {
  font-size: 1.1rem;
}

.landing-section .hero-img {
  max-width: 40%;
}

.feature-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
}

.feature-section .feature-card {
  width: 100%;
  background-color: #F2F2F2;
  border-radius: 10px;
  padding: 30px;
  box-sizing: border-box;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

.feature-section .feature-card h2 {
  font-family: 'Rubik', sans-serif;
}

.feature-section .feature-card p {
  font-family: 'Rubik', sans-serif;
  padding-top: 10px;
  line-height: 1.5;
}

.feature-section .feature-card a {
  display: inline-block;
  font-family: Arial;
  font-weight: 700;
  padding: 7px 17px;
  background-color: rgba(81, 88, 185, 1.0);
  color: #F2F2F2;
  border-radius: 5px;
  margin-top: 10px;
  font-size: 1rem;
  text-decoration: none;
  outline: none;
  border: none;
}

@media (max-width: 768px) {
  .home {
    padding-top: 5rem;
    margin-left: 10px;
    margin-right: 10px;
    padding-bottom: 2rem;
  }
  .landing-section {
    flex-direction: column;
    justify-content: center;
    gap: 0;
  }
  .landing-section .hero-img {
    max-width: 100%;
  }
  .feature-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 920px) {
  .feature-section {
    grid-template-columns: 1fr;
  }
}
`;

class HomeView extends BaseView {
  constructor() {
    super();
    this.setTitle('Whealthier - Home');
  }
  
  async getHtml() {
    let htmlString = `
    <div class="home">
      <div class="landing-section">
        <div class="hero-text">
          Health is Wealth
          <div class="hero-description">
            if you have a good health it is the biggest wealth you can acquire
          </div>
        </div>
        <img src="https://ik.imagekit.io/pzrj7oa3hsd/timathon-health/20210827_190038_6DFGtyrfft.jpg?updatedAt=1630084064658" class="hero-img">
      </div>
      <section-break></section-break>
      
      <div class="feature-section" id="features">
        <div class="feature-card">
          <h2>Diet Planner</h2>
          <p>
            Eating healthy food is one of the best ways you can maintain your
            health. At Whealthier, we provide a diet planner which generates a
            personalized diet plan according to your health and food preferences.
          </p>
          <a href="/diet-planner" spa-page-link="true">Go there</a>
        </div> 
        <div class="feature-card">
          <h2>Meditation Corner</h2>
          <p>
            Along with physical health maintaining mental health is necessary
            for a healthy life. Immerse your mind into complete relaxation with
            assisted breathing and ambient background music at the meditation
            corner at Whealthier.
          </p>
          <a href="/meditation-corner" spa-page-link="true">Go there</a>
        </div>
        <div class="feature-card">
          <h2>Macro Calculator</h2>
          <p>
            Knowing your macros is very important if you follow a regular
            health routine. And we also provide a macro calculator for that.
            Along with the body macros it also shows other information like
            Body Fat Percentage, Daily Calorie Intake, etc...
          </p>
          <a href="/macro-calculator" spa-page-link="true">Go there</a>
        </div>
        <div class="feature-card">
          <h2>Disease Info</h2>
          <p>
            Getting a breif information about a less vulnerable disease is
            better than consulting your doctor. At Whealthier, we provide a
            feature which can give you a detailed summary of a disease.
          </p>
          <a href="/disease-info" spa-page-link="true">Go there</a>
        </div>
      </div>

    </div>
    `;
    htmlString += ('<style>' + homeViewStyle + '</style>');
    return htmlString;
  }
};

export {
  HomeView
};