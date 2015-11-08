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
                            <input className="filter-bar__input" type="radio" value="all" defaultChecked />
                            All
                        </label>
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="sites" />
                            Sites
                        </label>
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="food" />
                            Food
                        </label>
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="drinks" />
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
                            <input className="filter-bar__input" type="radio" value="architecture" />
                            Architecture
                        </label>
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="art" />
                            Art
                        </label>
                    </div>
                    <div className="filter-bar__group -food">
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="bakery" />
                            Bakery
                        </label>
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="bar" />
                            Bar
                        </label>
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="farmers-market" />
                            Farmer&#8217;s Market
                        </label>
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="fast-food" />
                            Fast Food
                        </label>
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="restaurant" />
                            Restaurant
                        </label>
                    </div>
                    <div className="filter-bar__group -drinks">
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="bar" />
                            Bar
                        </label>
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="brewery" />
                            Brewery/Brewpub
                        </label>
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="cafe" />
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
                            <input className="filter-bar__input" type="radio" value="price_1" />
                            $
                        </label>
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="price_2" />
                            $$
                        </label>
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="price_3" defaultChecked />
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
                            <input className="filter-bar__input" type="radio" value="distance_1" />
                            Within 4 Blocks
                        </label>
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="distance_2" defaultChecked />
                            Walking (1.5 mi)
                        </label>
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="distance_3" />
                            Bus/Subway (5 mi)
                        </label>
                        <label className="filter-bar__label">
                            <input className="filter-bar__input" type="radio" value="distance_4" />
                            If We Had More Time
                        </label>
                    </div>
                </CheckboxGroup>
            </div>
        );
    }
});

module.exports = FilterBar;