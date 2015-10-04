'use strict';

var React = require('react');
require('./counter.css');

/**
 * @class Counter
 * @extends ReactComponent
 */
class Counter extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            counter: 0
        };

        this.increment = this.increment.bind(this);
        this.remove = this.remove.bind(this);

        setInterval(this.increment.bind(this), 1000);
    }

    render () {
        return (
            <div className='Counter'>

                <h1>Counter</h1>

                <p>This is a counter component. It stores the count in its state.</p>
                <p>If you edit any file that is bundled by webpack, webpack dev server will patch this page while preserving component state.</p>
                <p>This is called <em>hot module reloading</em> and is more useful than just auto-reloading the whole page (if you reload the page, you'll see the counter drops to zero because component state is not persisted).</p>

                <span className='-number'>{this.state.counter}</span>
                <button className='-button' type='button' onClick={this.increment.bind(this)}>+</button>
                <button className='-button' type='button' onClick={this.remove.bind(this)}>–</button>

            </div>
        );
    }

    increment () {
        super.setState({counter: this.state.counter + 1});
    }

    remove () {
        super.setState({counter: this.state.counter - 1});
    }
}


module.exports = Counter;
