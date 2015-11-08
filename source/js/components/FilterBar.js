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
        // console.log('FilterBar componentDidUpdate');
        // console.log('this.state: ', this.state);

        // console.log('this.state.category: ', this.state.category);
        // console.log('this.state.subcategory: ', this.state.subcategory);
        // console.log('this.state.sort: ', this.state.sort);
        // console.log('this.state.price: ', this.state.price);
        // console.log('this.state.distance: ', this.state.distance);
        // console.log('\n\n');
    },
    updateSelections: function() {
        var newState = {
            category: this.refs.categoryGroup.getCheckedValues()[0],
            subcategory: this.refs.subcategoryGroup.getCheckedValues()[0],
            sort: this.refs.sortGroup.getCheckedValues()[0],
            price: this.refs.priceGroup.getCheckedValues()[0],
            distance: this.refs.distanceGroup.getCheckedValues()[0]
        };

        // console.log('newState: ', newState);

        this.setState({
            selections: newState
        });

        this.props.callbackParent(newState);
    },
    render: function() {
        return (
            <div className="filter-bar">
                <CheckboxGroup
                    name="sort"
                    ref="sortGroup"
                    onChange={this.updateSelections}
                >
                    Sort:<br />
                    <div className="filter-bar__group">
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="closest_to_hotel" defaultChecked />
                            Closest to Our Hotel
                        </label>
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="closest_to_us" />
                            Closest to Us
                        </label>
                    </div>
                </CheckboxGroup>
                <CheckboxGroup
                    name="category"
                    ref="categoryGroup"
                    onChange={this.updateSelections}
                >
                    Category:<br />
                    <div className="filter-bar__group -main-group">
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="All" defaultChecked />
                            All
                        </label>
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="Sites" />
                            Sites
                        </label>
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="Food" />
                            Food
                        </label>
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="Drinks" />
                            Drinks
                        </label>
                    </div>
                </CheckboxGroup>
                <CheckboxGroup
                    name="subcategory"
                    ref="subcategoryGroup"
                    onChange={this.updateSelections}
                >
                    Subcategory:<br />
                    <div className="filter-bar__group -sights">
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="Architecture" />
                            Architecture
                        </label>
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="Art" />
                            Art
                        </label>
                    </div>
                    <div className="filter-bar__group -food">
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="Bakery" />
                            Bakery
                        </label>
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="Bar" />
                            Bar
                        </label>
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="Farmer's Market" />
                            Farmer&#8217;s Market
                        </label>
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="Fast Food" />
                            Fast Food
                        </label>
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="Restaurant" />
                            Restaurant
                        </label>
                    </div>
                    <div className="filter-bar__group -drinks">
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="Bar" />
                            Bar
                        </label>
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="Brewery" />
                            Brewery/Brewpub
                        </label>
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="Cafe" />
                            Cafe
                        </label>
                    </div>
                </CheckboxGroup>
                <CheckboxGroup
                    name="price"
                    ref="priceGroup"
                    onChange={this.updateSelections}
                >
                    Price:<br />
                    <div className="filter-bar__group">
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="1" />
                            $
                        </label>
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="2" />
                            $$
                        </label>
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="3" defaultChecked />
                            $$$
                        </label>
                    </div>
                </CheckboxGroup>
                <CheckboxGroup
                    name="distance"
                    ref="distanceGroup"
                    onChange={this.updateSelections}
                >
                    Distance:<br />
                    <div className="filter-bar__group">
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="0.5" />
                            Within 4 Blocks
                        </label>
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="1.5" defaultChecked />
                            Walking (1.5 mi)
                        </label>
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="5" />
                            Bus/Subway (5 mi)
                        </label>
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="4000" />
                            If We Had More Time
                        </label>
                    </div>
                </CheckboxGroup>
            </div>
        );
    }
});

module.exports = FilterBar;