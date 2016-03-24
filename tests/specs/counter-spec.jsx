'use strict';

// In order for React to use our test DOM we need to require it before requiring React
require('./test-dom')();
var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('chai').expect;
var then = require('./then');

var Counter = require('../src/components/counter');


describe('Counter component.', () => {

    var TestUtils = require('react-addons-test-utils');
    var Simulate = TestUtils.Simulate;
    
    var component;
    var renderedDOMElement;
    var interval = 100;


    before(() => {
        component = TestUtils.renderIntoDocument(<Counter interval={ interval } />);
        renderedDOMElement = ReactDOM.findDOMNode(component);
    });


    // Done callback indicates that this test block finished, required for asynchronous testing
    it('renders counter value', (done) => {
        let counterValue = component.state.counter;
        let renderedDOMNumber = parseInt(renderedDOMElement.querySelector('.-number').textContent);

        expect(renderedDOMNumber).to.equal(counterValue);

        // Function parsed as first parameter will be called in 1 second (the second parameter)
        then(
            () => {
                counterValue = component.state.counter.toString();
                renderedDOMNumber = renderedDOMElement.querySelector('.-number').textContent;

                expect(renderedDOMNumber).to.equal(counterValue);

                done();
            },
            interval
        );
    });


    it('increments/decrements counter when +/- button clicked', (done) => {
        let currentCounterValue = parseInt(renderedDOMElement.querySelector('.-number').textContent);
        let incrementButton = renderedDOMElement.querySelectorAll('.-button')[0];

        Simulate.click(incrementButton);

        // The DOM counter value will be changed on next React setState tick
        // so we use then function to check our expectation after it happens
        then(() => {
            let incrementedValue = parseInt(renderedDOMElement.querySelector('.-number').textContent);

            expect(incrementedValue).to.equal(currentCounterValue + 1);

            currentCounterValue = incrementedValue;
            let decrementButton = renderedDOMElement.querySelectorAll('.-button')[1];

            Simulate.click(decrementButton);
        })
        .then(() => {
            let decrementedValue = parseInt(renderedDOMElement.querySelector('.-number').textContent);

            expect(decrementedValue).to.equal(currentCounterValue - 1);

            done();
        });
    });
});
