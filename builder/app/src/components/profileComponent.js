import React, { PropTypes } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Pin from 'material-ui/svg-icons/maps/pin-drop';
import { TextField,Tabs,Tab,FontIcon,Drawer,MenuItem,RaisedButton,ListItem,Avatar } from 'material-ui';
import axios from 'axios';
import { bindActionCreators } from 'redux'
import { connect, Provider } from 'react-redux';
import * as Actions from '../actions/actions';
import SwipeableViews from 'react-swipeable-views';
const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
  skillset:{
    margin:'0.2em'
  }
};
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      profile: {
    "fullName": "Sidharth Sahu",
    "headline": "Application Developer at Reverie Language Technologies",
    "pictureUrl": "http://some.shit/",
    "connections": [
      "ObjectId(\"58a442f5328f136d72328b57\")",
      "ObjectId(\"58a442f5328f136d72328b57\")"
    ],
    "requests": [
      "ObjectId(\"58a442f5328f136d72328b57\")",
      "ObjectId(\"58a442f5328f136d72328b57\")"
    ],
    "rating": 3.4,
    "uniqueChats": [
      "ObjectId(\"58a442f5328f136d72328b57\")",
      "ObjectId(\"58a442f5328f136d72328b57\")"
    ],
    "totalPoints": 433,
    "email": "sidharth016@gmail.com",
    "personal": {
      "dob": "6 March 1989",
      "gender": "male",
      "hobbies": [
        "football",
        "guitars",
        "audio engineering",
        "vocals"
      ]
    },
    "work": {
      "designation": "app dev",
      "currentWorkPlace": "Nocturne Creative",
      "skills": [
        "Javascript",
        "Java",
        "mysQl"
      ]
    }
  }
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange = (value) => {
   this.setState({
     slideIndex: value,
   });
 };

componentDidMount(){
  console.log(this.state.profile);
}
  render () {
    return (
      <MuiThemeProvider>
          <div>
            <MenuItem  style={{background:'linear-gradient(#91e1f9, #007aa9)'}}>
              <div style={{textAlign:'center',padding:'1em'}}>
                <div>
                  <Avatar
                     src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAloAAAAJGM3NGE3OTIzLTkwYTMtNGVkNS05MzljLTlmOTA5ZDcyNDI4Zg.jpg"
                     size={120}
                     style={{borderStyle:'solid',borderWidth:'2vw',borderColor:'rgba(6, 47, 142, 0.64)'}}
                   />
                </div>
                <div className="row" style={{lineHeight:'2em'}}>
                  <span className="col-sm-12" style={{color:'#fff',fontWeight:'600'}}>{this.state.profile.fullName}</span>
                </div>
                <div className="row" style={{lineHeight:'0.5em'}}>
                  <span className="col-sm-12" style={{color:'#fff',fontWeight:'200',fontSize:'4vw'}}>Full Stack Developer</span>
                </div>
                <div className="row" style={{paddingBottom:'1em'}}>
                  <span className="col-md-10" style={{color:'#fff',fontWeight:'600',fontSize:'3vw'}}>
                    bangalore
                  </span>
                </div>
              </div>
            </MenuItem>
            <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab label="Work" value={0} style={{background:'linear-gradient(#007aa9,#146f8a)'}} />
        <Tab label="Personal" value={1} style={{background:'linear-gradient(#007aa9,#146f8a)'}} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div style={{padding:'2em'}}>
            <div className="form-group">
              <label style={{fontSize:'1em',color:'black',fontWeight:'450'}} className="control-label" htmlFor="inputDefault">Current Workplace</label>
              <input type="text" value={this.state.profile.work.currentWorkPlace} className="form-control" id="inputDefault"/>
            </div>
            <div className="form-group">
              <label style={{fontSize:'1em',color:'black',fontWeight:'450'}} className="control-label" htmlFor="inputDefault">Designation</label>
              <input type="text" value={this.state.profile.work.designation} className="form-control" id="inputDefault"/>
            </div>
            <div className="form-group">
              <label style={{fontSize:'1em',color:'black',fontWeight:'450'}} className="control-label" htmlFor="inputDefault">Skills</label>
            <div style={{maxWidth:'90vw'}}>
            {this.state.profile.work.skills.map((skill)=>{
                return <span className="label label-primary" style={styles.skillset}>{skill}</span>
              })
            }
            </div>
            </div>
          </div>
          <div style={{padding:'2em',overflowY:'scroll'}} >
            <div className="form-group">
              <label style={{fontSize:'1em',color:'black',fontWeight:'450'}} className="control-label" htmlFor="inputDefault">Name</label>
            <input type="text" value={this.state.profile.fullName} className="form-control" id="inputDefault"/>
            </div>
            <div className="form-group">
              <label style={{fontSize:'1em',color:'black',fontWeight:'450'}} className="control-label" htmlFor="inputDefault">Gender</label>
              <input type="text" value={this.state.profile.personal.gender} className="form-control" id="inputDefault"/>
            </div>
            <div className="form-group">
              <label style={{fontSize:'1em',color:'black',fontWeight:'450'}} className="control-label" htmlFor="inputDefault">Birthday</label>
              <input type="text" value={this.state.profile.personal.dob} className="form-control" id="inputDefault"/>
            </div>
            <div className="form-group">
              <label style={{fontSize:'1em',color:'black',fontWeight:'450'}} className="control-label" htmlFor="inputDefault">Email</label>
              <input type="text" value={this.state.profile.email} className="form-control" id="inputDefault"/>
            </div>
          </div>
        </SwipeableViews>
      </div>
    </div>
      </MuiThemeProvider>
    )
  }
}
