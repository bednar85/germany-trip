var React = require('react');
var Main = require('../components/Main');
var Home = require('../components/Home');
var List = require('../components/List');
var Detail = require('../components/Detail');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

module.exports = (
  <Route name="app" path="/" handler={Main}>
    <Route name="list" path="list/:destination" handler={List} />
    <DefaultRoute handler={Home} />
  </Route>
);