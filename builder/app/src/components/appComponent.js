import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Pin from 'material-ui/svg-icons/maps/pin-drop';
import { FontIcon,Drawer,MenuItem,RaisedButton,ListItem,Avatar } from 'material-ui';
import axios from 'axios';
import Nav from './navComponent';
import { bindActionCreators } from 'redux'
import { connect, Provider } from 'react-redux';
import * as Actions from '../actions/actions';
import Carousel from './splash/carouselComponent'
import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
} from 'material-ui/styles/colors';

/**
 * The app component
 */
export class App extends React.Component {



  render() {
    return (
      <div>
          {this.props.children}
      </div>
    )
  }
}


//
