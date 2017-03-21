/**
 * This is a demo component, feel free to delete this or modify this to your needs
 */

import React, { PropTypes } from 'react'

import { bindActionCreators } from 'redux'
import { connect, Provider } from 'react-redux';
import * as Actions from '../actions/actions';

@connect(
  (state) => ({ demoString: state.demo }), // map state to props
  (dispatch) => ({ actions: bindActionCreators(Actions, dispatch)}) //map dispatch to props
)
export default class DemoComponent extends React.Component {
  componentDidMount() {
    console.log(this)
  }

  render () {
    return (
      <div></div>
    )
  }
}
