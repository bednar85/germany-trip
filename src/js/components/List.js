var React = require('react');
var Router = require('react-router');

var List = React.createClass({
  render: function(){
    var destination = this.props.params.destination;
    return (
      <div>
          List Component: {destination}
      </div>
    )
  }
});

module.exports = List;