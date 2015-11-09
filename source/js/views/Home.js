var React = require('react');
var Router = require('react-router');
var Link = Router.Link;




var Home = React.createClass({
    render: function() {
        return (
            <div>
                <h2 className="">Home View</h2>
                <ul className="">
                    <li className="col-sm-4 text-center">
                        <Link to="destination" params={{destination: "berlin"}}>Berlin</Link>
                    </li>
                    <li className="col-sm-4 text-center">
                        <Link to="destination" params={{destination: "munich"}}>Munich</Link>
                    </li>
                    <li className="col-sm-4 text-center">
                        <Link to="destination" params={{destination: "vienna"}}>Vienna</Link>
                    </li>
                </ul>
            </div>
        )
    }
});

module.exports = Home;