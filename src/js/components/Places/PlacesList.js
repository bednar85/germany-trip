var React = require('react');




var PlacesList = React.createClass({
  render: function(){
    var places = this.props.places.map(function(place, index){
      return (
        <li className="list-group-item" key={index}>
          {place.id} <br />
          {place.name} <br />
          {place.address}
        </li>
      )
    });
    return (
      <ul className="list-group">
        {places}
      </ul>
    )
  }
});

module.exports = PlacesList;