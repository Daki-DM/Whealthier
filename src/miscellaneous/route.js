// class for every route
class Route {
  name = '';
  view = null;
  constructor(
    _name,
    _view
  ) {
    this.name = _name;
    this.view = _view;
  }
  isMatch(pathName) {
    return this.name === pathName;
  }
}

export {
  Route
};