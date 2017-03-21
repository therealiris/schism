import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import ReactDOM from 'react-dom'
import InitialState from './initialState'

//configure store function
export default function configureStore(rootReducer) {
  // redux middle wares
  const middlewares = [thunk]

  // redux enhancers
  const enhancers = []

  const devToolsExtension = window.devToolsExtension;
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }

  const store = createStore(rootReducer, InitialState,
      compose(
        applyMiddleware(...middlewares),
        ...enhancers)
    );


  if (module.hot) {
    module.hot.accept('../reducers/rootReducer', () => {
      store.replaceReducer(rootReducer);
    })
  }

  return store
}




//
