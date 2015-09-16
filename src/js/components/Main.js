var React = require('react');
var RouteHandler = require('react-router').RouteHandler;

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