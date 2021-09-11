import { Route } from './route.js';
import { HomeView } from '../views/home/home.js';
import { MeditationCornerView } from '../views/meditation-corner/meditation-corner.js';
import { AboutView } from '../views/about/about.js';
import { MacroCalculator } from '../views/macro-calculator/macro-calculator.js';
import { DietPlanner } from '../views/diet-planner/diet-planner.js'
import { DiseaseInfo } from '../views/disease-info/disease-info.js';

let routes = [
  new Route('/', HomeView),
  new Route('/meditation-corner', MeditationCornerView),
  new Route('/about', AboutView),
  new Route('/macro-calculator', MacroCalculator),
  new Route('/diet-planner', DietPlanner),
  new Route('/disease-info', DiseaseInfo)
]

// handles routing in the app
class Router {
  /*
   * @param routes Array [ Route ]
   **/
  static async router() {
    let potentialMatches = routes.map(route => {
      return {
        route: route,
        isMatch: route.isMatch(location.pathname)
      }
    });
    
    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
    
    if(!match) {
      match = {
        route: routes[0],
        isMatch: true
      };
    }
    
    let view = new match.route.view();
    let app = document.getElementById('app');
    app.innerHTML = '';
    app.innerHTML = await view.getHtml();
  }
  static navigateTo(url) {
    history.pushState(null, null, url);
    Router.router();
  }
}

export {
  Router
};