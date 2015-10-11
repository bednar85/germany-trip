var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
// Components
var FilterBar = require('./FilterBar');
// Libs
var _ = require('lodash');




// Receive data from Destination component, reorganize data based on props, alphabetical by default
var PlacesList = React.createClass({
    getInitialState: function() {
        return {
            places: [],
            filterBarSelections: {}
        };
    },
    componentWillReceiveProps: function() {
        // console.log('PlacesList componentWillReceiveProps: ', this.state.filterBarSelections.sort);  
    },
    componentDidUpdate: function() {
        // console.log('PlacesList componentDidUpdate: ', this.state.filterBarSelections.sort);
    },
    filterData: function(collection) {
        var outputData = collection;
        var filterBar = this.state.filterBarSelections;
        var distanceMax = 0;
        var sortBy = '';

        switch(filterBar.sort) {
            case 'a_to_z':
                console.log('sort by a_to_z');
                sortBy = 'name';
                break;
            case 'closest_to_hotel':
                console.log('sort by closest_to_hotel');
                sortBy = 'distanceFromHotel';
                break;
            case 'closest_to_us':
                console.log('sort by closest_to_us');
                sortBy = 'distanceFromUs';
                break;
            default:
                console.log('default');
        }

        outputData = _.map(_.sortBy(outputData, sortBy));

        if(filterBar.sort === 'closest_to_hotel' || filterBar.sort === 'closest_to_us') {

            switch(filterBar.distance) {
                case 'distance_1':
                    distanceMax = 0.5;
                    break;
                case 'distance_2':
                    distanceMax = 1.5;
                    break;
                case 'distance_3':
                    distanceMax = 5;
                    break;
                case 'distance_4':
                    distanceMax = 100;
                    break;
                default:
                    distanceMax = 1.5;
            }

            console.log('distanceMax: ', distanceMax);

            // outputData = _.filter(outputData, function(n) {
            //     return n[sortBy] <= distanceMax;
            // });
        }

        

        // sort places data based on distanceFromHotel value
        return outputData;
    },
    onChildChanged: function(newState) {
        // console.log('onChildChanged: ', newState);

        this.setState({
            filterBarSelections: newState
        });
    },
    render: function() {
        console.log('PlacesList render');
        var destination = this.props.destination;

        var filteredData = this.filterData(this.props.places);

        // output storedPlacesData to a var, render var to screen
        var places = filteredData.map(function(place, index) {
            return (
                <li className="list-group-item" key={index}>
                    {place.name}<br />
                    {place.address}<br />
                    {place.description.short}<br />
                    distance from hotel: {place.distanceFromHotel} mi<br />
                    distance from us: {place.distanceFromUs} mi
                </li>
            )
        });

        return (
            <div>
                <FilterBar callbackParent={this.onChildChanged} />
                <h3>Info for {destination}</h3>
                <ul className="list-group">
                    {places}
                </ul>
            </div>
        )
    }
});

module.exports = PlacesList;