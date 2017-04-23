const React = require('react');
const PropTypes = require('prop-types');

require('./counter.css');

class Counter extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    };

    this.increment = this.increment.bind(this);
    this.remove = this.remove.bind(this);

    setInterval(this.increment, this.props.interval);
  }

  increment() {
    this.setState({ counter: this.state.counter + 1 });
  }

  remove() {
    this.setState({ counter: this.state.counter - 1 });
  }

  render() {
    return (
      <div className="Counter">

        <h1>Counter</h1>

        <p>This component is rendered on the <strong>frontend</strong>.</p>
        <p>This is a counter component. It stores the count in its state.</p>
        <p>
          If you edit any file that is bundled by webpack, webpack dev server will
          patch this page while preserving component state, without reloading the page.
        </p>
        <p>
          This is called <em>hot module reloading</em> and is more useful than just
          auto-reloading the whole page (if you reload the page, you&apos;ll see the counter
          drops to zero because component state is not persisted).
        </p>

        <span className="-number">{this.state.counter}</span>
        <button className="-button" type="button" onClick={this.increment}>+</button>
        <button className="-button" type="button" onClick={this.remove}>–</button>

      </div>
    );
  }
}


Counter.defaultProps = {
  interval: 1000
};

Counter.propTypes = {
  interval: PropTypes.number.isRequired
};


module.exports = Counter;
