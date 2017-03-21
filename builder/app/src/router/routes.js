import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

/**
 * Page level components
 */
import { App } from '../components/appComponent'
import Demo from '../components/demoComponent'

/**
 * The application routes
 */
const routes = (
   <Route path="/" component={App}>
     <Route path="demo" component={Demo}></Route>
   </Route>
)

export default routes
