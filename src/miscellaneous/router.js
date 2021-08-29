import { Route } from './route.js';
import { HomeView } from '../views/home/home.js';
import { MeditationCornerView } from '../views/meditation-corner/meditation-corner.js';
import { AboutView } from '../views/about/about.js';

let routes = [
  new Route('/', HomeView),
  new Route('/meditation-corner', MeditationCornerView),
  new Route('/about', AboutView)
]

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
    document.getElementById('app').innerHTML = await view.getHtml();
  }
  static navigateTo(url) {
    history.pushState(null, null, url);
    Router.router();
  }
}

export {
  Router
};