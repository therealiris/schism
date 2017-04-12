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
     <IndexRoute component={Welcome}/>
     <Route path="profile" component={Profile}></Route>
     <Route path="demo" component={Demo}></Route>
   </Route>
)

export default routes
