var PlacesList = React.createClass({

    render: function() {
        var displayPlaces = (places) => <li>{places}</li>;

        return (
            <ul>
                { this.props.items.map(displayPlaces) }
            </ul>
        );
    }

});