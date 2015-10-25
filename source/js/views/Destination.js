var React = require('react');
var Router = require('react-router');
// Components
var GlobalHeader = require('../components/GlobalHeader');
var PlacesList = require('../components/PlacesList');
// Libs
var $ = require('jquery');




// Get data from Firebase for PlacesList component based on destination var from URL
var Destination = React.createClass({
    mixins: [Router.State],
    getInitialState: function() {
        return {
            places: [],
            cityCoords: {
                'berlin': {
                    'latitude': 52.520007,
                    'longitude': 13.404954
                },
                'munich': {
                    'latitude': 48.135125,
                    'longitude': 11.581981
                },
                'vienna': {
                    'latitude': 48.208174,
                    'longitude': 16.373819
                }
            },
            ourCoords: {
                'latitude': 0,
                'longitude': 0,
                'accuracy': 0
            }
        };
    },
    init: function() {
        console.log('Destination init');

        // store value of this in a var for later use deeper in scope of this function
        var component = this;
        var currentCity = this.getParams().destination;
        var dataPath = '/data/' + currentCity + '.json';

        // get current location
        this.getCurrentLocation();

        // get JSON data
        $.getJSON(dataPath, function(places) {
            console.log('getJSON success');
            console.log('places.length: ', places.length);
            component.setInitialDistance(component, currentCity, places);
        })
        .done(function() {
            console.log('getJSON done');
        })
        .fail(function(status, error) {
            if(status == 'parseerror'){
                console.log('getJSON error: not valid json');
            } else {
                console.log('some other error');
                console.log('getJSON error: ', status);
            }
        })
        .always(function() {
            console.log('getJSON complete');
        });
    },
    componentWillMount: function() {
        // attach helper method to Number prototype
        Number.prototype.toRad = function() {
            return this * Math.PI / 180;
        };

        this.init();
    },
    componentWillReceiveProps: function() {
        this.init();
    },
    componentDidUpdate: function() {
        // console.log('Destination componentDidUpdate');
        // console.log('this.state.filterBarSelections: ', this.state.filterBarSelections);
        // console.log('\n\n');
    },
    getCurrentLocation: function() {
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

        var output = Math.round((d * 0.621371) * 10) / 10; // convert to miles, then round to 1 decimal point

        return output; // convert to miles
    },
    setInitialDistance: function(component, currentCity, places) {
        // for each place in places
        places.forEach(function(place) {
            // calculate distance from "hotel"
            place.distanceFromHotel = component.calculateDistance(place.coords.latitude, place.coords.longitude, component.state.cityCoords[currentCity].latitude, component.state.cityCoords[currentCity].longitude);

            // calculate distance from current location
            place.distanceFromUs = component.calculateDistance(place.coords.latitude, place.coords.longitude, component.state.ourCoords.latitude, component.state.ourCoords.longitude);
        });

        // store places in state
        this.setState({
            places: places
        });
    },
    render: function() {
        console.log('Destination render');

        return (
            <div className="">
                <GlobalHeader locationData={this.state.ourCoords} />
                <div className="container">
                    <PlacesList destination={this.getParams().destination} places={this.state.places} filterBarSelections={this.state.filterBarSelections} />
                </div>
            </div>
        );
    }
});

module.exports = Destination;