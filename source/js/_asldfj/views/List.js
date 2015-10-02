var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var List = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function(){
    return {
      places: []
    }
  },
  componentWillMount: function(){
    console.log('componentWillMount');
    this.ref = new Firebase('https://germany-trip.firebaseio.com/');
    var childRef = this.ref.child(this.props.params.destination);
    this.bindAsArray(childRef, 'places');
  },
  componentWillUnmount: function(){
    this.unbind('places');
  },
  render: function(){
    // var destination = this.state.destination;
    var places = this.state.places.map(function(place, index){
      return (
        <li key={index}>
          <a href={'#/place/' + place.id}>
            <h1>{place.name}</h1>
            <h2>{place.address}</h2>
          </a>
        </li>
      );
    });
    return (
      <div>
        <h1>how about now</h1>
        <h2>Destination: {this.props.params.destination}</h2>
        <ul>
          {places}
        </ul>
      </div>
    )
  }
});

module.exports = List;