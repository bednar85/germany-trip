var React = require('react');
var Main = require('../components/Main');
var Home = require('../views/Home');
var List = require('../views/List');
var Details = require('../views/Details');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

module.exports = (
  <Route name="app" path="/" handler={Main}>
    <Route name="details" path="details/:place" handler={Details} />
    <Route name="list" path="list/:destination" handler={List} />
    <DefaultRoute handler={Home} />
  </Route>
);