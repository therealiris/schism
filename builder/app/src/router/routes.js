import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

/**
 * Page level components
 */
import { App } from '../components/appComponent'
import Demo from '../components/demoComponent'
import  Profile  from '../components/profileComponent'
import Welcome from '../components/welcomeComponent'
/**
 * The application routes
 */
const routes = (
   <Route path="/" component={App}>
     <Route path="welcome" component={Welcome}></Route>
     <Route path="profile" component={Profile}></Route>
   </Route>
)

export default routes
