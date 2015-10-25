var React = require('react');
// var Router = require('react-router');
// var Link = Router.Link;
var CitySelector = require('./CitySelector');




var GlobalHeader = React.createClass({
    render: function() {
        var latitude = this.props.locationData.latitude.toFixed(4);
        var longitude = this.props.locationData.longitude.toFixed(4);

        return (
            <header className="global-header">
                <CitySelector />

                Architecture

                Art/Design

                Food/Drink

                <div className="global-header__location-data">
                    <span className="global-header__location-data__value -latitude">{latitude}&deg;</span>, <span className="global-header__location-data__value -longitude">{longitude}&deg;</span>
                </div>
            </header>
        )
    }
});  

module.exports = GlobalHeader;