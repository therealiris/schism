import React from 'react';
import $ from 'jquery';
import AppBar from 'material-ui/AppBar';
import { IconButton } from 'material-ui';
import Notify from 'material-ui/svg-icons/notification/event-available';
// navbar
export default class Nav extends React.Component {

  constructor(props){
    super(props)
    this.handleTouchTap = this.handleTouchTap.bind(this)
  }
  componentDidMount(){
    $('html').removeClass('hidden')
  }
  handleTouchTap(e){
    let f = e.target
    console.log("getting lait");
    this.props.toggle()
  }
  render() {
    return (
      <AppBar
        title="Iris"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        onClick={this.handleTouchTap}
        style={{backgroundColor:'#72c1fc'}}
      />
    )
  }
}
