var React = require('react');
var NotesList = require('./NotesList');

var Notes = React.createClass({
  propTypes: {
    destination: React.PropTypes.string.isRequired,
    notes: React.PropTypes.array.isRequired
  },
  render: function(){
    return (
      <div>
        <h3>Info for {this.props.destination} </h3>
        <NotesList notes={this.props.notes} />
      </div>
    )
  }
});

module.exports = Notes;