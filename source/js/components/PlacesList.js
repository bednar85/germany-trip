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
        var inputData = collection;
        var outputData = inputData;
        var filterBar = this.state.filterBarSelections;
        var priceMax = 0;
        var distanceMax = 0;
        var sortBy = '';

        console.log('filterData: ', filterBar);

        // Determine sortBy value
        switch(filterBar.sort) {
            case 'closest_to_hotel':
                sortBy = 'distanceFromHotel';
                break;
            case 'closest_to_us':
                sortBy = 'distanceFromUs';
                break;
        }

        // Filter by Category
        // ...

        // Filter by Subcategory
        // ...

        // Filter by Price
        switch(filterBar.price) {
            case 'price_1':
                priceMax = 1;
                break;
            case 'price_2':
                priceMax = 2;
                break;
            case 'price_3':
                priceMax = 3;
                break;
            default:
                priceMax = 3;
        }

        // filter inputData when priceRange is less than or equal to priceMax
        outputData = _.filter(outputData, function(n) {
            return n['priceRange'] <= priceMax;
        });

        // Filter by Distance
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
                distanceMax = 4000;
                break;
            default:
                distanceMax = 1.5;
        }

        // temp distanceMax to show all
        // distanceMax = 4000;

        // filter inputData when sortBy (in this case the distance either from the hotel or from us) is less than or equal to distanceMax
        outputData = _.filter(outputData, function(n) {
            return n[sortBy] <= distanceMax;
        });

        // Sort and Return
        return _.map(_.sortBy(outputData, sortBy));
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

        console.log('this.props.places: ', this.props.places);

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
                            <Link to="details" params={{place: place.id}}>{place.name}</Link>
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