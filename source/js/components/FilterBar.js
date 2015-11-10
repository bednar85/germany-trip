var React = require('react');
var CheckboxGroup = require('react-checkbox-group');
var $ = require('jquery');




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
        console.log('updateSelections');

        var newState = {
            category: this.refs.categoryGroup.getCheckedValues()[0],
            subcategory: this.refs.subcategoryGroup.getCheckedValues()[0],
            sort: this.refs.sortGroup.getCheckedValues()[0],
            price: this.refs.priceGroup.getCheckedValues()[0],
            distance: this.refs.distanceGroup.getCheckedValues()[0]
        };
        var $fitlerBar = $('.filter-bar');

        // console.log('newState: ', newState);

        this.setState({
            selections: newState
        });

        $fitlerBar.removeClass('-all-active -sites-active -food-active -drinks-active').addClass('-' + newState.category.toLowerCase() + '-active');

        this.props.callbackParent(newState);
    },
    render: function() {
        return (
            <div className="filter-bar">
                <div className="filter-bar__content">
                    <CheckboxGroup
                        name="sort"
                        ref="sortGroup"
                        onChange={this.updateSelections}
                    >
                        <h2 className="fitler-bar__group-title">Sort:</h2>
                        <div className="filter-bar__group -sort">
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
                        <h2 className="fitler-bar__group-title">Category:</h2>
                        <div className="filter-bar__group -category">
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
                        <h2 className="fitler-bar__group-title">Subcategory:</h2>
                        <div className="filter-bar__group -subcategory -sites">
                            <label className="filter-bar__label">
                                <input className="filter-bar__input" type="radio" value="Architecture" />
                                Architecture
                            </label>
                            <label className="filter-bar__label">
                                <input className="filter-bar__input" type="radio" value="Art" />
                                Art
                            </label>
                        </div>
                        <div className="filter-bar__group -subcategory -food">
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
                        <div className="filter-bar__group -subcategory -drinks">
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
                        <h2 className="fitler-bar__group-title">Price:</h2>
                        <div className="filter-bar__group -price">
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
                        <h2 className="fitler-bar__group-title">Distance:</h2>
                        <div className="filter-bar__group -distance">
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
                                <input className="filter-bar__input" type="radio" value="5000" />
                                If We Had More Time
                            </label>
                        </div>
                    </CheckboxGroup>
                </div>
            </div>
        );
    }
});

module.exports = FilterBar;