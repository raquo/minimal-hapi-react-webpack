/* eslint global-require: ["off"] */

describe('Counter component.', () => {
  // In order for React to use our test DOM we need to require it before requiring React
  require('../utils/test-dom')();

  const React = require('react');
  const ReactDOM = require('react-dom');
  const TestUtils = require('react-dom/test-utils');
  const expect = require('chai').expect;

  const Counter = require('../../src/components/counter');

  let component;
  let renderedDOMElement;
  const interval = 10;

  const parseIntFromNode = node => parseInt(node.textContent, 10);

  before(() => {
    component = TestUtils.renderIntoDocument(<Counter interval={interval} />);
    renderedDOMElement = ReactDOM.findDOMNode(component); // eslint-disable-line react/no-find-dom-node
  });


  // `done` callback allows the test to wait for asynchronous code to complete
  it('renders counter value', (done) => {
    const counterValue = component.state.counter;
    let renderedDOMNumber = parseIntFromNode(renderedDOMElement.querySelector('.-number'));

    expect(renderedDOMNumber).to.equal(counterValue);

    setTimeout(
      () => {
        const nextCounterValue = component.state.counter;
        renderedDOMNumber = parseIntFromNode(renderedDOMElement.querySelector('.-number'));

        expect(nextCounterValue).to.equal(counterValue + 1);
        expect(renderedDOMNumber).to.equal(nextCounterValue);

        done();
      },
      interval,
    );
  });


  it('increments counter when `+` button clicked', () => {
    const currentCounterValue = parseIntFromNode(renderedDOMElement.querySelector('.-number'));
    const incrementButton = renderedDOMElement.querySelectorAll('.-button')[0];

    TestUtils.Simulate.click(incrementButton);

    const incrementedValue = parseIntFromNode(renderedDOMElement.querySelector('.-number'));

    expect(incrementedValue).to.equal(currentCounterValue + 1);
  });


  it('decrements counter when `-` button clicked', () => {
    const currentCounterValue = parseIntFromNode(renderedDOMElement.querySelector('.-number'));
    const decrementButton = renderedDOMElement.querySelectorAll('.-button')[1];

    TestUtils.Simulate.click(decrementButton);

    const decrementedValue = parseIntFromNode(renderedDOMElement.querySelector('.-number'));

    expect(decrementedValue).to.equal(currentCounterValue - 1);
  });
});
