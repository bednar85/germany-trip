var React = require('react');
var Router = require('react-router');




// Get data from Firebase for PlacesList component based on destination var from URL
var Details = React.createClass({
    mixins: [Router.State],
    getInitialState: function() {
        return {
            place: {}
        };
    },
    init: function() {
        console.log('Details init');

    },
    componentWillMount: function() {
        // this.init();
    },
    componentWillReceiveProps: function() {
        // this.init();
    },
    componentDidUpdate: function() {
        // console.log('Details componentDidUpdate');
        // console.log('this.state.filterBarSelections: ', this.state.filterBarSelections);
        // console.log('\n\n');
    },
    render: function() {
        console.log('Details render');

        return (
            <div className="row">
            asdfasdf
            </div>
        );
    }
});

module.exports = Details;