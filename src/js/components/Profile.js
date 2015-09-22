var React = require('react');
var Router = require('react-router');
var Notes = require('./Notes/Notes');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var Profile = React.createClass({
  mixins: [Router.State, ReactFireMixin],
  getInitialState: function(){
    return {
      notes: []
    }
  },
  init: function(){
    var childRef = this.ref.child(this.getParams().destination);
    this.bindAsArray(childRef, 'notes');
  },
  componentDidMount: function(){
    this.ref = new Firebase('https://germany-trip.firebaseio.com/');
    this.init();
  },
  componentWillUnmount: function(){
    this.unbind('notes');
  },
  componentWillReceiveProps: function(){
    this.unbind('notes');
    this.init();
  },
  render: function(){
    var destination = this.getParams().destination;
    return (
      <div className="row">
        <div className="col-md-12">
          <Notes destination={destination} notes={this.state.notes} />
        </div>
      </div>
    )
  }
});

module.exports = Profile;