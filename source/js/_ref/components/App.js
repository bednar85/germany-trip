var React = require('react');
var Parent = require('./Parent');

React.render(<Parent />, document.getElementById('app'));

// var App = React.createClass({
//     getInitialState: function() {
//         return {
//             items: [],
//             places: ''
//         };
//     },

//     onChange: function(e) {
//         var places = e.target.value;

//         this.setState({ places });
//     },

//     addPlaces: function(e) {
//         this.setState({
//             items: this.state.items.concat([this.state.places]),
//             places: ''
//         });

//         e.preventDefault();
//     },

//     render: function() {
//         return (
//             <div>
//                 <h1>My Placess</h1>

//                 <PlacesList items={this.state.items} />

//                 <form onSubmit={this.addPlaces}>
//                     <input onChange={this.onChange} value={this.state.places} />
//                     <button>Add Places</button>
//                 </form>
//             </div>
//         );
//     }

// });

// React.render(<App />, document.body);