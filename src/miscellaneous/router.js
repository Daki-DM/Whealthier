import { Route } from './route.js';

class Router {
  /*
   * @param routes Array [ Route ]
   **/
  constructor(routes) {
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
  }
}

export {
  Route,
  Router
};