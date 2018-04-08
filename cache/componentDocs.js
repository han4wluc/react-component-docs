import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
