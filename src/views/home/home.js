import BaseView from '../baseView.js';

let homeViewStyle = `
.home {
  padding-top: 3rem;
  margin-left: 4rem;
  margin-right: 4rem;
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
  display: flex;
  flex-direction: column;
}

.feature-section .feature-card {
  width: 100%;
  background-color: #F2F2F2;
  border-radius: 10px;
  margin-bottom: 10px;
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
  }
  .landing-section {
    flex-direction: column;
    justify-content: center;
    gap: 0;
  }
  .landing-section .hero-img {
    max-width: 100%;
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
            Diet Planner can provide a personalised diet plan according to your
            preferences. Just provide how many meals you eat a day and your
            health preferences. And you will get your custom diet plan.
          </p>
          <a href="/diet-planner" spa-page-link="true">Go there</a>
        </div> 
        <div class="feature-card">
          <h2>Meditation Corner</h2>
          <p>
            Meditation is a consciousness-changing technique that has been
            shown to have a wide number of benefits on psychological well-being
          </p>
          <a href="/meditation-corner" spa-page-link="true">Go there</a>
        </div>
        <div class="feature-card">
          <h2>Macro Calculator</h2>
          <p>
            Macro Calculator can say how much calories you need to eat a day. It
            also gives a breakdown on how much fats, proteins and carbs you need
            to eat.
          </p>
          <a href="/macro-calculator" spa-page-link="true">Go there</a>
        </div>
        <div class="feature-card">
          <h2>Disease Info</h2>
          <p>
            Disease Info is a nice feature which provides a detailed summary of
            a disease. Type in the disease name and it will give you the information on that
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