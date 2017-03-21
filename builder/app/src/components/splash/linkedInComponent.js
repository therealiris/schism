// LinkedInLoginComponent.js
import React from 'react'
import LinkedIn from 'react-linkedin-login'
import autobind from 'autobind-decorator'
import axios from 'axios';
export default class LoginWithLinkedin extends React.Component {

  static propTypes = {

  }

  @autobind
  callbackLinkedIn (all) {
    console.log(all)
    let me = this
    var redirect = encodeURIComponent(window.location.href)
    axios.post("https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code="+all.code+"&redirect_uri="+redirect+"&client_id=814w5ob3tx9u9l&client_secret=5iTHc1jZ3SXkUMjS")
    .then(function(response){
      var accessToken = response.data.access_token;
      axios.get("https://api.linkedin.com/v1/people/~:(num-connections,picture-url,first-name,last-name)?oauth2_access_token="+accessToken+"&format=json")
        .then(function(res){
          me.props.login(res.data)
        })
    })

  }

  render () {
    return (
      <div className="linkedInDiv" style={{color:'#848484',display:'inline-flex',textAlign:'center',boxShadow:'0px 3px 25px -3px',margin:'0 3em',padding:'0 1em',background:''}} >
        <span style={{color:"#2dacdf",fontSize:'2em',padding:'1vw 0 1vw 1vw'}}><i className="fa fa-linkedin-square" /></span>
        <LinkedIn
        clientId='814w5ob3tx9u9l'
        callback={this.callbackLinkedIn}
        className="linkedIn"
        text='Login with LinkedIn' />
      </div>

    )
  }

}
