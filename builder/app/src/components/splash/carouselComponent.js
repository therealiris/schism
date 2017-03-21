import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Slider from 'nuka-carousel';
import $ from 'jquery';
import { Paper,RaisedButton,FontIcon } from 'material-ui';
import '../../../styles/paper.css'
import LinkedIn from './linkedInComponent'
var settings = {
      infinite: true,
      slidesToShow: 1,
      swipeToSlide: true,
      afterChange: function (index) {
        console.log(`Slider Changed to: ${index + 1}, background: #222; color: #bada55`);
      }
  }
  const style = {
    height: '60vh',
    width:'60vw',
    margin: 30,
    textAlign: 'center',
    display: 'inline-block',
  };
export default class Carousel extends React.Component {

  componentDidMount(){
    $('html').removeClass('hidden')
  }
  mixins: [Slider.ControllerMixin]
  render(){
    return(
      <MuiThemeProvider>
        <div style={{textAlign:'center'}}>
          <div className="row" style={{textAlign:'center',padding:'4vh'}}>
            <img src='../../images/logo.svg' style={{width:'40%'}}/>
          </div>
            <Slider>
              <Paper style={style} zDepth={3}>
                <div style={{paddingTop:'1.5em'}}>
                  <span style={{fontSize:'14px'}}>Connect with professionals and Entrepreneurs</span>
                </div>
                  <img src='../../images/splash/splash1.svg' style={{width:'inherit'}}/>
              </Paper>
              <Paper style={style} zDepth={3}>
                <div style={{paddingTop:'1.5em'}}>
                  <span style={{fontSize:'14px'}}>Refer and Rate people based on their expertise to collect points</span>
                </div>
                  <img src='../../images/splash/splash2.svg' style={{width:'inherit'}}/>
              </Paper>
              <Paper style={style} zDepth={3}>
                <div style={{paddingTop:'1.5em'}}>
                  <span style={{fontSize:'14px'}}>Redeem your points for exclusive coupons and offers</span>
                </div>
                  <img src='../../images/splash/splash3.svg' style={{width:'inherit'}}/>
              </Paper>
              <Paper style={style} zDepth={3}>
                <div style={{paddingTop:'1.5em'}}>
                  <span style={{fontSize:'14px'}}>Recieve live notifications for your favourite hobbies and interests</span>
                </div>
                  <img src='../../images/splash/splash4.svg' style={{width:'inherit'}}/>
              </Paper>
            </Slider>
            <div className="row" style={{textAlign:'center'}}>
              <LinkedIn login={this.props.login}/>
            </div>
          </div>
      </MuiThemeProvider>
    )

  }

}
