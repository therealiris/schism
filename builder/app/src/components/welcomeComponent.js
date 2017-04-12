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
export default class Welcome extends React.Component {

  constructor(props){
    super(props)
    this.state = {open:false,location:"",loggedIn:false,avatar:"",name:""}
    this.toggleDrawer = this.toggleDrawer.bind(this)
    this.closeDrawer = this.closeDrawer.bind(this)
    this.getLocation = this.getLocation.bind(this)
    this.login = this.login.bind(this)
    this.handleProfile = this.handleProfile.bind(this)
  }
  handleProfile(){
    console.log("here now");
    window.location.href = '/profile'
  }
  toggleDrawer(){
    let toggle = !this.state.open
    this.setState({open:toggle})
  }
  login(data){
    console.log(data);
    let fullName = data.firstName+ " "+ data.lastName
    this.setState({loggedIn:true,avatar:data.pictureUrl, name:fullName})
    this.toggleDrawer()
  }
  closeDrawer(){
    if(this.state.open)
    this.setState({open:false})
  }
  getLocation(){
    let me = this;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
          axios.get("http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&sensor=true")
          .then((response)=>{
            let locations = response.data.results[0].address_components
            locations.forEach((location)=>{
              if(location.types.includes("administrative_area_level_2"))
                {
                  me.setState({location:location.long_name})
                }
            })

          })
        }, ()=>{

        });
    }
  }
  componentDidMount() {
    this.getLocation()
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          {this.state.loggedIn?<Nav toggle={this.toggleDrawer} onClick={this.closeDrawer}/> : <Carousel login={this.login}/>}
          <Drawer open={this.state.open}>

            <MenuItem onClick={this.handleProfile} style={{background:'#577ed7'}}>
              <div style={{textAlign:'center',padding:'1em'}}>
                <div>
                  <Avatar
                     src={this.state.avatar}
                     size={120}
                     style={{borderStyle:'solid',borderWidth:'2vw',borderColor:'rgba(6, 47, 142, 0.64)'}}
                   />
                </div>
                <div className="row" style={{lineHeight:'2em'}}>
                  <span className="col-sm-12" style={{color:'#fff',fontWeight:'600'}}>{this.state.name}</span>
                </div>
                <div className="row" style={{lineHeight:'0.5em'}}>
                  <span className="col-sm-12" style={{color:'#fff',fontWeight:'200',fontSize:'4vw'}}>Full Stack Developer</span>
                </div>
                <div className="row" style={{paddingBottom:'1em'}}>
                  <span className="col-md-10" style={{color:'#fff',fontWeight:'600',fontSize:'3vw'}}>
                    {this.state.location}
                  </span>
                </div>
              </div>
            </MenuItem>
            <MenuItem>Discover</MenuItem>
            <MenuItem>My Connections</MenuItem>
            <MenuItem>Invite</MenuItem>
          </Drawer>
        </div>

      </MuiThemeProvider>

    )
  }
}


//
