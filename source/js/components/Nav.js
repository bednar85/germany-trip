var React = require('react');
var Router = require('react-router');
var Link = Router.Link;




var Nav = React.createClass({
  render: function() {
    return (
      <div className="col-sm-12">
        <ul className="col-sm-12 list-inline">
          <li className="col-sm-4 text-center"><Link to="destination" params={{destination: "berlin"}}>Berlin</Link></li>
          <li className="col-sm-4 text-center"><Link to="destination" params={{destination: "munich"}}>Munich</Link></li>
          <li className="col-sm-4 text-center"><Link to="destination" params={{destination: "vienna"}}>Vienna</Link></li>
        </ul>
      </div>
    )
  }
});

module.exports = Nav;