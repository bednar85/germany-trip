var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
// var Nav = require('./Nav');




var Main = React.createClass({
    render: function() {
        return (
            <div className="">
                <RouteHandler />
            </div>
        )
    }
});

module.exports = Main;