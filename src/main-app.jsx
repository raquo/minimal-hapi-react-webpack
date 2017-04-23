// React must be in scope when using JSX because JSX is translated into React.createElement(...)
const React = require('react');
const ReactDOM = require('react-dom');
const Counter = require('./components/counter');

require('./main-app.css');


function mainApp() {
  ReactDOM.render(
    <Counter />,
    document.getElementById('appContainer'),
  );
}


document.addEventListener('DOMContentLoaded', mainApp);
