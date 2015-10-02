var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = require('react-router').RouteHandler;
var Link = Router.Link;

var Main = React.createClass({
  render: function(){
    return (
      <div className="main-container">
        <header>
          <ul>
            <li><a href="#/list/berlin">Berlin</a></li>
            <li><a href="#/list/munich">Munich</a></li>
            <li><a href="#/list/vienna">Vienna</a></li>
          </ul>
        </header>
        <div className="container">
          <RouteHandler />
        </div>
        <footer>Footer</footer>
      </div>
    )
  }
});

module.exports = Main;