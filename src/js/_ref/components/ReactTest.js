var UserGist = React.createClass({
    getInitialState: function() {
        return {
            name: '',
            address: ''
        };
    },

    // Invoked once before first render
    componentWillMount: function() {
        // $.get(this.props.source, function(result) {
        //     var lastGist = result[0];
        //     if (this.isMounted()) {
        //         this.setState({
        //             name: lastGist.name,
        //             address: lastGist.address
        //         });
        //     }
        // }.bind(this));
    },

    // Invoked once after the first render
    componentDidMount: function() {
        // alert('In Component Did Mount');
        $.get(this.props.source, function(result) {
            var lastGist = result[0];
            if (this.isMounted()) {
                this.setState({
                    name: lastGist.name,
                    address: lastGist.address
                });
            }
        }.bind(this));
    },

    // Invoked whenever there is a prop change
    componentWillReceiveProps: function(nextProps) {
        alert('In Component Will Receive Props');
    },

    // Called IMMEDIATELY before a component is unmounted
    componentWillUnmount: function() {},

    render: function() {
        return (
            <div>
                <h1>Name: {this.state.name}</h1>
                <h2>Address: {this.state.address}</h2>
            </div>
        );
    }
});

React.render(<UserGist source="/data/react-test.json" />, document.body);



// var TaskApp = React.createClass({
//     getInitialState: function() {
//         return {
//             items: [],
//             task: ''
//         };
//     },

//     onChange: function(e) {
//         var task = e.target.value;

//         this.setState({ task });
//     },

//     addTask: function(e) {
//         this.setState({
//             items: this.state.items.concat([this.state.task]),
//             task: ''
//         });

//         e.preventDefault();
//     },

//     render: function() {
//         return (
//             <div>
//                 <h1>My Tasks</h1>

//                 <TaskList items={this.state.items} />

//                 <form onSubmit={this.addTask}>
//                     <input onChange={this.onChange} value={this.state.task} />
//                     <button>Add Task</button>
//                 </form>
//             </div>
//         );
//     }

// });

// React.render(<TaskApp />, document.body);