var React = require('react');
var Router = require('react-router');
var Navigation = Router.Navigation;
// Libs
var $ = require('jquery');
var Flickity = require('flickity');




// create new function so that newState setting isnt repeated below
var CitySelector = React.createClass({
    mixins: [ Navigation ],
    getInitialState: function() {
        return {
            selection: {}
        };
    },
    componentDidMount: function() {
        // this.updateSelections();

        var component = this;

        var selector = new Flickity('.city-selector', {
            prevNextButtons: false,
            pageDots: false
        });

        // selector.on('cellSelect', function() {
        selector.on('settle', function() {
            // console.log('Flickity settled at ' + selector.selectedIndex);

            var selection = '';

            // if newSelection != oldSelection

            switch(selector.selectedIndex) {
                case 0: 
                    selection = 'berlin';
                    break;
                case 1:
                    selection = 'munich';
                    break;
                case 2:
                    selection = 'vienna';
                    break;
            }

            // console.log('selection: ' + selection);

            component.navigateAfterSomethingHappened(selection);
        });

        // $('body').addClass('berlin');
    },
    componentDidUpdate: function() {
        // console.log('CitySelector componentDidUpdate');
        // console.log('this.state: ', this.state);

        // console.log('this.state.sort: ', this.state.sort);
        // console.log('this.state.price: ', this.state.price);
        // console.log('this.state.distance: ', this.state.distance);
        // console.log('\n\n');
    },
    updateSelections: function() {
        // var newState = {
        //     sort: this.refs.sortGroup.getCheckedValues()[0],
        //     price: this.refs.priceGroup.getCheckedValues(),
        //     distance: this.refs.distanceGroup.getCheckedValues()[0]
        // };

        // this.setState({
        //     selection: newState
        // });

        // this.props.callbackParent(newState);
    },
    navigateAfterSomethingHappened: function(selection) {
        // probably would be better to handle this change of data without a route change, seems to stutter as the slider is transitioning
        this.transitionTo('destination', { destination: selection });

        // $('body').removeClass('berlin munich vienna');
        // $('body').addClass(selection);
    },
    render: function() {
        return (
            <div className="city-selector">
                <div className="city-selector__option -berlin" data-city="berlin">
                    <div className="city-selector__option__content">
                        <h1 className="city-selector__option__heading">Berlin</h1>
                        <p className="city-selector__option__caption">Catedral de Berlin</p>
                        <img className="city-selector__option__background" src="img/cities/berlin.jpg" />
                    </div>
                </div>
                <div className="city-selector__option -munich" data-city="munich">
                    <div className="city-selector__option__content">
                        <h1 className="city-selector__option__heading">Munich</h1>
                        <p className="city-selector__option__caption">Neuschwanstein Castle</p>
                        <img className="city-selector__option__background" src="img/cities/munich.jpg" />
                    </div>
                </div>
                <div className="city-selector__option -vienna" data-city="vienna">
                    <div className="city-selector__option__content">
                        <h1 className="city-selector__option__heading">Vienna</h1>
                        <p className="city-selector__option__caption">Schönbrunn Palace</p>
                        <img className="city-selector__option__background" src="img/cities/vienna.jpg" />
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = CitySelector;