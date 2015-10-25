var React = require('react');
var Router = require('react-router');
var FilterBar = require('./FilterBar');
var PlacesList = require('./PlacesList');
var $ = require('jquery');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');




// Get data from Firebase for PlacesList component based on destination var from URL

// would probably be best/quicker to sort the list data over here since this is where the state where I store them

var Destination = React.createClass({
    mixins: [Router.State, ReactFireMixin],
    getInitialState: function() {
        return {
            places: [],
            dataLoaded: false,
            cityCoords: {
                'latitude': 52.520007,
                'longitude': 13.404954
            },
            ourCoords: {
                'latitude': 0,
                'longitude': 0,
                'accuracy': 0
            },
            sort: [],
            price: [],
            distance: []
        };
    },
    init: function() {
        // console.log('this.getParams().destination: ', this.getParams().destination);

        // var childRef = this.firebaseRef.child(this.getParams().destination);
        // this.bindAsArray(childRef, 'places');

        var component = this;

        // get current location
        this.getLocation();

        var dataPath = '/data/' + this.getParams().destination + '.json';

        // get JSON data
        $.get('/data/berlin.json', function(places) {
            // store this in component var for use later
            var component = this;

            // for each place in places
            places.forEach(function(place) {
                // calculate distance from "hotel"
                place.distanceFromHotel = component.calculateDistance(place.latlongnetData.latitude, place.latlongnetData.longitude, component.state.cityCoords.latitude, component.state.cityCoords.longitude);

                // calculate distance from current location
                place.distanceFromUs = component.calculateDistance(place.latlongnetData.latitude, place.latlongnetData.longitude, component.state.ourCoords.latitude, component.state.ourCoords.longitude);

                // log each place
                console.log('place: ', place);
            });

            // store places in state
            this.setState({
                data: places
            });
        }.bind(this));
    },
    componentWillMount: function() {
        // attach helper method to Number prototype
        Number.prototype.toRad = function() {
            return this * Math.PI / 180;
        };

        // this.firebaseRef = new Firebase('https://germany-trip.firebaseio.com/');
        this.init();

        console.log('componentWillMount places.length: ', this.state.places.length);
    },
    componentWillReceiveProps: function() {
        // this.unbind('places');
        this.init();
    },
    componentDidUpdate: function() {
        console.log('componentDidUpdate this.state.places.length: ', this.state.places.length);

        // this.setDistance();
    },
    componentWillUnmount: function() {
        // this.unbind('places');
    },
    onChildChanged: function(newState) {
        // console.log('onChildChanged: ', newState);

        this.setState({
            sort: newState.sort,
            price: newState.price,
            distance: newState.distance
        });
    },
    getLocation: function() {
        var component = this;

        navigator.geolocation.getCurrentPosition(function(position) {
            component.setState({
                ourCoords: {
                    'latitude': position.coords.latitude,
                    'longitude': position.coords.longitude,
                    'accuracy': position.coords.accuracy
                },
            });
        }, function() {
            return;
        });
    },
    calculateDistance: function(lat1, lon1, lat2, lon2) {
        var R = 6371; // kilometers
        var dLat = (lat2 - lat1).toRad();
        var dLon = (lon2 - lon1).toRad(); 
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
            Math.sin(dLon / 2) * Math.sin(dLon / 2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
        var d = R * c;

        var distance = Math.round((d * 0.621371) * 10) / 10; // convert to miles, then round to 1 decimal point

        return distance; // convert to miles
    },
    setDistance: function() {
        // store value of this in a var for later use deeper in scope of this function
        // var component = this;

        // var places = this.state.places;


        // if(places.length === 20) {
        //     // for each place in places
        //     places.forEach(function(place) {
        //         // calculate distance from "hotel"
        //         place.distanceFromHotel = component.calculateDistance(place.latlongnetData.latitude, place.latlongnetData.longitude, component.state.cityCoords.latitude, component.state.cityCoords.longitude);

        //         // calculate distance from current location
        //         place.distanceFromUs = component.calculateDistance(place.latlongnetData.latitude, place.latlongnetData.longitude, component.state.ourCoords.latitude, component.state.ourCoords.longitude);

        //         // log each place
        //         console.log('place: ', place);
        //     });

        //     // store places in state
        //     this.setState({
        //         places: places
        //     });
        // }
    },
    render: function() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <FilterBar callbackParent={this.onChildChanged} />
                    <PlacesList destination={this.getParams().destination} places={this.state.places} />
                </div>
            </div>
        )
    }
});

module.exports = Destination;