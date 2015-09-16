var React = require('react');

var Home = React.createClass({
  render: function(){
    return (
      <div>
        Home Component
        <a href="/list/">List</a>
      </div>
    )
  }
});

module.exports = Home;