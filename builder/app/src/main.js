// include styles
import 'normalize-css';
import "../styles/main.scss";

/* vendor libs */
import '../../modernizr';

/* react stuf */
import React from 'react';
import ReactDOM from 'react-dom';

/* routing stuf */
import { hashHistory, browserHistory } from 'react-router';
import routes from './router/routes';
import Root from './containers/rootContainer'
import injectTapEventPlugin from 'react-tap-event-plugin';
import configureStore from './store/store';
import rootReducer from './reducers/rootReducer';
/**
 * Configure Redux store
 */
const store = configureStore(rootReducer);
injectTapEventPlugin();
/**
 * Mount the root component wrapped with Redux provider
 */
ReactDOM.render(
  <Root store={store} history={browserHistory} routes={routes} />
  ,document.getElementById('app-mount-point')
);



//
