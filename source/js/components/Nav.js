var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;




var Nav = React.createClass({
  mixins: [Router.Navigation],
  handleSubmit: function() {
    var destination = this.refs.destination.getDOMNode().value;
    this.refs.destination.getDOMNode().value = '';
    this.transitionTo('profile', {destination: destination});
  },
  render: function() {
    return (
      <div className="col-sm-12">
        <ul className="col-sm-12 list-inline">
          <li className="col-sm-4 text-center"><Link to="profile" params={{destination: "berlin"}}>Berlin</Link></li>
          <li className="col-sm-4 text-center"><Link to="profile" params={{destination: "munich"}}>Munich</Link></li>
          <li className="col-sm-4 text-center"><Link to="profile" params={{destination: "vienna"}}>Vienna</Link></li>
        </ul>
      </div>
    )
  }
});

module.exports = Nav;