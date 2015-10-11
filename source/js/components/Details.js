var React = require('react');
var Router = require('react-router');
var PlacesList = require('./PlacesList');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');




// Get data from Firebase for PlacesList component based on destination var from URL

// would probably be best/quicker to sort the list data over here since this is where the state where I store them

var Details = React.createClass({
  mixins: [Router.State, ReactFireMixin],
  getInitialState: function() {
    return {
      places: []
    }
  },
  init: function() {
    var childRef = this.ref.child(this.getParams().destination);
    this.bindAsArray(childRef, 'places');
  },
  componentDidMount: function() {
    this.ref = new Firebase('https://germany-trip.firebaseio.com/');
    this.init();
  },
  componentWillUnmount: function() {
    this.unbind('places');
  },
  componentWillReceiveProps: function() {
    this.unbind('places');
    this.init();
  },
  render: function() {
    return (
      <div className="row">
        <div className="col-md-12">
          <PlacesList destination={this.getParams().destination} places={this.state.places} />
        </div>
      </div>
    )
  }
});

module.exports = Details;