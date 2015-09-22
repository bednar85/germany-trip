var React = require('react');
var Router = require('react-router');

var SearchGithub = React.createClass({
  mixins: [Router.Navigation],
  handleSubmit: function(){
    var destination = this.refs.destination.getDOMNode().value;
    this.refs.destination.getDOMNode().value = '';
    this.transitionTo('profile', {destination: destination});
  },
  render: function(){
    return (
      <div className="col-sm-12">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group col-sm-7">
            <input type="text" className="form-control" ref="destination" />
          </div>
          <div className="form-group col-sm-5">
            <button type="submit" className="btn btn-block btn-primary">Search Destinations</button>
          </div>
        </form>
      </div>
    )
  }
});

module.exports = SearchGithub;