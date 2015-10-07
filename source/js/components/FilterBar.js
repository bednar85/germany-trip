var React = require('react');




var FilterBar = React.createClass({
  handleSubmit: function() {
    // var destination = this.refs.destination.getDOMNode().value;
    // this.refs.destination.getDOMNode().value = '';
    // this.transitionTo('destination', {destination: destination});
  },
  render: function() {
    return (
      <form>
        <div>
          <h2>Sort By</h2>
          <fieldset>
          <label htmlFor="sort--alphabetical">
            <input type="radio" name="sort" id="sort--alphabetical" defaultChecked />
            A-Z
          </label>
          <label htmlFor="sort--closest_to_us">
            <input type="radio" name="sort" id="sort--closest_to_us" />
            Closest to Us
          </label>
          <label htmlFor="sort--closest_to_hotel">
            <input type="radio" name="sort" id="sort--closest_to_hotel" />
            Closest to Hotel
          </label>
          </fieldset>
        </div>
        <div>
          <h2>Price</h2>
          <fieldset>
            <label htmlFor="filter--price_range_1">
              <input type="checkbox" name="price_range" id="filter--price_range_1" />
              $
            </label>
            <label htmlFor="filter--price_range_2">
              <input type="checkbox" name="price_range" id="filter--price_range_2" />
              $$
            </label>
            <label htmlFor="filter--price_range_3">
              <input type="checkbox" name="price_range" id="filter--price_range_3" />
              $$$
            </label>
            <label htmlFor="filter--price_range_4">
              <input type="checkbox" name="price_range" id="filter--price_range_4" />
              $$$$
            </label>
          </fieldset>
        </div>
        <div>
          <h2>Distance</h2>
          <fieldset>
            <label htmlFor="filter--distance_1">
              <input type="radio" name="distance" id="filter--distance_1" />
              Within 4 Blocks
            </label>
            <label htmlFor="filter--distance_2">
              <input type="radio" name="distance" id="filter--distance_2" defaultChecked />
              Walking (1.5 mi)
            </label>
            <label htmlFor="filter--distance_3">
              <input type="radio" name="distance" id="filter--distance_3" />
              Busing (5 mi)
            </label>
            <label htmlFor="filter--distance_4">
              <input type="radio" name="distance" id="filter--distance_4" />
              If We Had More Time
            </label>
          </fieldset>
        </div>
      </form>
    )
  }
});

module.exports = FilterBar;