import React from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';


/**
 * The root container
 */
export default class RootContainer extends React.Component {

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { store, history, routes } = this.props;
    return (
      <Provider store={store}>
        <Router history={history}>
          {routes}
        </Router>
      </Provider>
    )
  }
}
