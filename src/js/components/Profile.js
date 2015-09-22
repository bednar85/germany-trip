var React = require('react');
var Router = require('react-router');
var Places = require('./Places/Places');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');




var Profile = React.createClass({
  mixins: [Router.State, ReactFireMixin],
  getInitialState: function(){
    return {
      places: []
    }
  },
  init: function(){
    var childRef = this.ref.child(this.getParams().destination);
    this.bindAsArray(childRef, 'places');
  },
  componentDidMount: function(){
    this.ref = new Firebase('https://germany-trip.firebaseio.com/');
    this.init();
  },
  componentWillUnmount: function(){
    this.unbind('places');
  },
  componentWillReceiveProps: function(){
    this.unbind('places');
    this.init();
  },
  render: function(){
    var destination = this.getParams().destination;
    return (
      <div className="row">
        <div className="col-md-12">
          <Places destination={destination} places={this.state.places} />
        </div>
      </div>
    )
  }
});

module.exports = Profile;