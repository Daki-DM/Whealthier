import { Route } from './route.js';

class Router {
  /*
   * @param routes Array [ Route ]
   **/
  static async router(routes) {
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
  static navigateTo(url, routes) {
    history.pushState(null, null, url);
    Router.router(routes);
  }
}

export {
  Route,
  Router
};