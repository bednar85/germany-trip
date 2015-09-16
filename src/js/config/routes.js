var React = require('react');
var Main = require('../components/Main');
var List = require('../components/List');
var Detail = require('../components/Detail');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

module.exports = (
  <Route name="app" path="/" handler={Main}>
    <DefaultRoute handler={List} />
  </Route>
);