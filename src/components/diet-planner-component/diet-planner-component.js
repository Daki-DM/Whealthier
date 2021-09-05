let dietPlannerStyle = `
.diet-planner {
  padding-top: 5rem;
  margin-left: 4rem;
  margin-right: 4rem;
  padding-bottom: 4rem;
}

.diet-planner h2 {
  font-family: 'Rubik', sans-serif;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .diet-planner {
    padding-top: 5rem;
    margin-left: 10px;
    margin-right: 10px;
  }
}
`;

class DietPlannerComponent extends HTMLElement {
  constructor() {
    super();
    
    let shadow = this.attachShadow({mode: 'open'});
    
    let content = document.createElement('div');
    content.classList.add('diet-planner');
    
    let heading = document.createElement('h2');
    heading.innerText = 'Diet Planner';
    
    content.appendChild(heading);
    
    let style = document.createElement('style');
    style.innerHTML = dietPlannerStyle;
    content.appendChild(style);
    
    shadow.appendChild(content);
  }
}

customElements.define('diet-planner-component', DietPlannerComponent);

export {
  DietPlannerComponent
};