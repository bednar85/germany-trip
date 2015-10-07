var React = require('react');
var CheckboxGroup = require('react-checkbox-group');




var FilterBar = React.createClass({
  getInitialState: function() {
    return {
      sort: [],
      price_range: [],
      distance: []
    };
  },
  componentDidMount: function() {
    this.setState({
      sort: this.refs.sortingGroup.getCheckedValues(),
      price_range: this.refs.filterPriceRangeGroup.getCheckedValues(),
      distance: this.refs.filterDistanceGroup.getCheckedValues()
    });
  },
  componentDidUpdate: function() {
    console.log('componentDidUpdate');
    console.log('this.state: ', this.state);
    console.log('\n\n');
  },
  handleChange: function() {
    this.setState({
      sort: this.refs.sortingGroup.getCheckedValues(),
      price_range: this.refs.filterPriceRangeGroup.getCheckedValues(),
      distance: this.refs.filterDistanceGroup.getCheckedValues()
    });
  },
  render: function() {
    return (
      <div>
        <CheckboxGroup
          name="sorting"
          ref="sortingGroup"
          onChange={this.handleChange}
        >
          <div>
            <label>
              <input type="radio" value="alphabetical" defaultChecked />
              A-Z
            </label>
            <label>
              <input type="radio" value="closest_to_us" />
              Closest to Us
            </label>
            <label>
              <input type="radio" value="closest_to_hotel" />
              Closest to Our Hotel
            </label>
          </div>
        </CheckboxGroup>
        <CheckboxGroup
          name="filter-price-range"
          ref="filterPriceRangeGroup"
          onChange={this.handleChange}
        >
          <div>
            <label>
              <input type="checkbox" value="price_range_1" />
              $
            </label>
            <label>
              <input type="checkbox" value="price_range_2" />
              $$
            </label>
            <label>
              <input type="checkbox" value="price_range_3" />
              $$$
            </label>
            <label>
              <input type="checkbox" value="price_range_4" />
              $$$$
            </label>
          </div>
        </CheckboxGroup>
        <CheckboxGroup
          name="filter-distance"
          ref="filterDistanceGroup"
          onChange={this.handleChange}
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