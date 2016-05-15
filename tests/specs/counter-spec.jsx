'use strict';

// In order for React to use our test DOM we need to require it before requiring React
require('../utils/test-dom')();

var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('chai').expect;

var Counter = require('../../src/components/counter');


describe('Counter component.', () => {

    var TestUtils = require('react-addons-test-utils');
    var Simulate = TestUtils.Simulate;

    var component;
    var renderedDOMElement;
    var interval = 20;


    before(() => {
        component = TestUtils.renderIntoDocument(<Counter interval={interval} />);
        renderedDOMElement = ReactDOM.findDOMNode(component);
    });


    // `done` callback allows the test to wait for asynchronous code to complete
    it('renders counter value', (done) => {
        var counterValue = component.state.counter;
        var renderedDOMNumber = parseInt(renderedDOMElement.querySelector('.-number').textContent);

        expect(renderedDOMNumber).to.equal(counterValue);

        setTimeout(
            () => {
                var nextCounterValue = component.state.counter;
                renderedDOMNumber = parseInt(renderedDOMElement.querySelector('.-number').textContent);

                expect(nextCounterValue).to.equal(counterValue + 1);
                expect(renderedDOMNumber).to.equal(nextCounterValue);

                done();
            },
            interval
        );
    });


    it('increments counter when `+` button clicked', () => {
        var currentCounterValue = parseInt(renderedDOMElement.querySelector('.-number').textContent);
        var incrementButton = renderedDOMElement.querySelectorAll('.-button')[0];

        Simulate.click(incrementButton);

        var incrementedValue = parseInt(renderedDOMElement.querySelector('.-number').textContent);

        expect(incrementedValue).to.equal(currentCounterValue + 1);
    });


    it('decrements counter when `-` button clicked', () => {
        var currentCounterValue = parseInt(renderedDOMElement.querySelector('.-number').textContent);
        var decrementButton = renderedDOMElement.querySelectorAll('.-button')[1];

        Simulate.click(decrementButton);

        var decrementedValue = parseInt(renderedDOMElement.querySelector('.-number').textContent);

        expect(decrementedValue).to.equal(currentCounterValue - 1);
    });
});
