var React = require('react');
var FilterBar = require('./FilterBar');
var _ = require('lodash');




// Receive data from Destination component, reorganize data based on props, alphabetical by default
var PlacesList = React.createClass({
  getInitialState: function() {
    return {
      distance: 0
    }
  },
  componentWillMount: function() {
    // Number.prototype.toRad = function() {
    //   return this * Math.PI / 180;
    // };
  },
  componentWillReceiveProps: function() {
  //   var distance;
  // },
  // calculateDistance: function(lat1, lon1, lat2, lon2) {
  //   var R = 6371; // kilometers
  //   var dLat = (lat2 - lat1).toRad();
  //   var dLon = (lon2 - lon1).toRad(); 
  //   var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //     Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
  //     Math.sin(dLon / 2) * Math.sin(dLon / 2); 
  //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  //   var d = R * c;
  //   return parseInt(d * 1000); // convert to meters
  },
  render: function() {
    var destination = this.props.destination;

    // var placesData = this.props.places;

    // console.log('placesData: ', placesData);

    // try to figure out better way to wait until all places loaded
    // if(placesData.length >= 20) {
    //   console.log('all things loaded asfasdfasdfs');

    //   var component = this;

    //   placesData.forEach(function(element, index) {
    //     console.log('name: ', placesData[index].name);
    //     console.log('latitude: ', placesData[index].latlongnetData.latitude);
    //     console.log('longitude: ', placesData[index].latlongnetData.longitude);
    //     console.log('\n');

    //     var placeLat = placesData[index].latlongnetData.latitude;
    //     var placeLon = placesData[index].latlongnetData.longitude;

    //     placesData[index].distanceFromHotel = component.calculateDistance(placeLat, placeLon, 52.520007, 13.404954);
    //   });

    //   console.log('placesData: ', placesData);

    //   var sortedPlacesData = _.map(_.sortBy(placesData, 'distanceFromHotel'));

    //   console.log('sortedPlacesData: ', sortedPlacesData);

      // var places = sortedPlacesData.map(function(place, index) {
      //   return (
      //     <li className="list-group-item" key={index}>
      //       id: {place.id}<br />
      //       name: {place.name}<br />
      //       address: {place.address}<br />
      //       description.short: {place.description.short}<br />
      //       distanceFromHotel: {place.distanceFromHotel}
      //     </li>
      //   )
      // });
    // }

    var places = this.props.places.map(function(place, index) {
      return (
        <li className="list-group-item" key={index}>
          id: {place.id}<br />
          name: {place.name}<br />
          address: {place.address}<br />
          description.short: {place.description.short}<br />
          distanceFromHotel: {place.distanceFromHotel}<br />
          distanceFromUs: {place.distanceFromUs}
        </li>
      )
    });

    return (
      <div>
        <FilterBar />
        <h3>Info for {destination}</h3>
        <ul className="list-group">
          {places}
        </ul>
      </div>
    )
  }
});

module.exports = PlacesList;