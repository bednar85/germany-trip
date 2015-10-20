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
        var outputData = [];
        var inputData = collection;
        var filterBar = this.state.filterBarSelections;
        var distanceMax = 0;
        var sortByKey = '';

        // Determin sortByKey value
        switch(filterBar.sort) {
            case 'a_to_z':
                sortByKey = 'name';
                break;
            case 'closest_to_hotel':
                sortByKey = 'distanceFromHotel';
                break;
            case 'closest_to_us':
                sortByKey = 'distanceFromUs';
                break;
            default:
                sortByKey = 'distanceFromHotel';
        }

        // Filter
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

            // temp distanceMax to show all
            // distanceMax = 100;

            outputData = _.filter(inputData, function(n) {
                return n[sortByKey] <= distanceMax;
            });
        }

        // Sort
        outputData = _.map(_.sortBy(inputData, sortByKey));

        // sort places data based on distanceFromHotel value
        return outputData;
    },
    onChildChanged: function(newState) {
        // console.log('onChildChanged: ', newState);

        this.setState({
            filterBarSelections: newState
        });
    },
    renderDynamicIcon: function(property, uniqueClass, src, repeat) {
        var output = [];
        var classes = 'icon ' + 'icon--' + uniqueClass;

        if(repeat) {
            var i = 0;
            while (i < property) {
                i++;
                output.push(<img className={classes} src={src} />);
            }
        }
        else {
            src = src[property - 1];
            if(src != '') {
                output.push(<img className={classes} src={src} />);
            }
        }

        return output;
    },
    render: function() {
        console.log('PlacesList render');
        var component = this;
        var destination = this.props.destination;
        var filteredData = this.filterData(this.props.places);

        // output storedPlacesData to a var, render var to screen
        var places = filteredData.map(function(place, index) {
            
            // render the icons to a var here
            var interestLevelImages = ['', 'img/interested.svg', 'img/really-interested.svg'];
            var interestLevel = component.renderDynamicIcon(place.interestLevel, 'interest-level', interestLevelImages);
            var priceRange = component.renderDynamicIcon(place.priceRange, 'price-range', 'img/price.svg', true);
            var directionsUrl = 'comgooglemaps://?saddr=My+Location&daddr=' + place.coords.latitude + ',' + place.coords.longitude;
            // var directionsUrl = 'comgooglemaps://?saddr=52.520007,13.404954&daddr=' + place.coords.latitude + ',' + place.coords.longitude;

            return (
                <li className="list-group-item place" key={index}>
                    <div className="place__general-info">
                        <h1 className="place__name">
                            {place.name}
                            <div className="icon-wrapper icon-wrapper--inline icon-wrapper--interest-level">{interestLevel}</div>
                        </h1>
                        <h2 className="place__address">{place.address}</h2>
                        <h2 className="place__directions-link"><a href={directionsUrl} target="_blank">Get Directions</a></h2>
                        <div className="icon-wrapper">{priceRange}</div>
                    </div>
                    <div className="places__distance-info">
                        <p className="place__distance-info__text">{place.distanceFromHotel} mi <img className="icon icon--hotel" src="img/hotel.svg" /></p>
                        <p className="place__distance-info__text">{place.distanceFromUs} mi <img className="icon icon--us" src="img/us.svg" /></p>
                    </div>
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