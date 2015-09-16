var React = require('react');
var Child = require('./Child');

var Parent = React.createClass({
  render: function(){
    return (
      <div>
        <div> This is the parent. </div>
        <Child name="Ryan"/>
      </div>
    )
  }
});

module.exports = Parent;