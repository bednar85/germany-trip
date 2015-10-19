var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Nav = require('./Nav');




var Main = React.createClass({
  render: function() {
    return (
      <div className="main-container">
        <nav className="navbar navbar-default" role="navigation">
          <div className="center-block">
            <Nav />
          </div>
        </nav>
        <div className="container">
          <RouteHandler />
        </div>
      </div>
    )
  }
});

module.exports = Main;