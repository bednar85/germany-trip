var React = require('react');
var CheckboxGroup = require('react-checkbox-group');




// create new function so that newState setting isnt repeated below

var FilterBar = React.createClass({
    getInitialState: function() {
        return {
            selections: {}
        };
    },
    componentDidMount: function() {
        this.updateSelections();
    },
    componentDidUpdate: function() {
        console.log('FilterBar componentDidUpdate');
        // console.log('this.state: ', this.state);

        // console.log('this.state.sort: ', this.state.sort);
        // console.log('this.state.price: ', this.state.price);
        // console.log('this.state.distance: ', this.state.distance);
        // console.log('\n\n');
    },
    updateSelections: function() {
        var newState = {
            sort: this.refs.sortGroup.getCheckedValues()[0],
            price: this.refs.priceGroup.getCheckedValues(),
            distance: this.refs.distanceGroup.getCheckedValues()[0]
        };

        this.setState({
            selections: newState
        });

        this.props.callbackParent(newState);
    },
    render: function() {
        return (
            <div>
                <CheckboxGroup
                    name="sort"
                    ref="sortGroup"
                    onChange={this.updateSelections}
                >
                    <div>
                        <label>
                            <input type="radio" value="a_to_z" />
                            A-Z
                        </label>
                        <label>
                            <input type="radio" value="closest_to_hotel" defaultChecked />
                            Closest to Our Hotel
                        </label>
                        <label>
                            <input type="radio" value="closest_to_us" />
                            Closest to Us
                        </label>
                    </div>
                </CheckboxGroup>
                <CheckboxGroup
                    name="price"
                    ref="priceGroup"
                    onChange={this.updateSelections}
                >
                    <div>
                        <label>
                            <input type="checkbox" value="price_1" />
                            $
                        </label>
                        <label>
                            <input type="checkbox" value="price_2" />
                            $$
                        </label>
                        <label>
                            <input type="checkbox" value="price_3" />
                            $$$
                        </label>
                        <label>
                            <input type="checkbox" value="price_4" />
                            $$$$
                        </label>
                    </div>
                </CheckboxGroup>
                <CheckboxGroup
                    name="distance"
                    ref="distanceGroup"
                    onChange={this.updateSelections}
                >
                    <div>
                        <label>
                            <input type="radio" value="distance_1" />
                            Within 4 Blocks
                        </label>
                        <label>
                            <input type="radio" value="distance_2" defaultChecked />
                            Walking (1.5 mi)
                        </label>
                        <label>
                            <input type="radio" value="distance_3" />
                            Bus/Subway (5 mi)
                        </label>
                        <label>
                            <input type="radio" value="distance_4" />
                            If We Had More Time
                        </label>
                    </div>
                </CheckboxGroup>
            </div>
        );
    }
});

module.exports = FilterBar;