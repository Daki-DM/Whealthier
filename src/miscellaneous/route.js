class Route {
  name = '';
  htmlPath = '';
  constructor(
    _name,
    _htmlPath
  ) {
    this.name = _name;
    this.htmlPath = _htmlPath;
  }
  isMatch(pathName) {
    return this.name === pathName;
  }
}

export {
  Route
};