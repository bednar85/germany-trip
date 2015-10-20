var React = require('react');
var Main = require('../components/Main');
var Home = require('../components/Home');
var Destination = require('../components/Destination');
var Details = require('../components/Details');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;




module.exports = (
    <Route name="app" path="/" handler={Main}>
        <Route name="details" path="details/:place" handler={Details} />
        <Route name="destination" path="destination/:destination" handler={Destination} />
        <DefaultRoute handler={Home} />
    </Route>
);