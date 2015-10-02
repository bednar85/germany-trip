var React = require('react');
var PlacesList = require('./PlacesList');




var Places = React.createClass({
  propTypes: {
    destination: React.PropTypes.string.isRequired,
    places: React.PropTypes.array.isRequired
  },
  render: function(){
    return (
      <div>
        <h3>Info for {this.props.destination} </h3>
        <PlacesList places={this.props.places} />
      </div>
    )
  }
});

module.exports = Places;