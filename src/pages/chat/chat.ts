import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as $ from 'jquery';
import Peer from "../../../node_modules/peerjs/lib/peer";
import { PeopleService } from '../../providers/people-service'
@Component({
  selector: 'chat-page',
  templateUrl: 'chat.html',
  providers: [PeopleService]

})
export class ChatPage {
  
  chatItem : any;
  peer : any;
  sendingConnect : any;
  connectionId: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public people: PeopleService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.chatItem = navParams.data
    this.peer = new Peer({key: '8fli63luazrjatt9'});
    setTimeout(()=>{
      this.setup(this.peer.id)
    },2000)
    this.peer.on('connection', (conn)=> {
      let connId = conn.peer
      this.sendingConnect = this.peer.connect(conn.peer)
      conn.on('data', function(data) 
      {
        fakeMessage(data)
        });
    });
    
    
    var $messages = $('.messages-content'),
    d, h, m,
    i = 0;


var me = this;
function setDate(){
  var d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}
function insertMessage() {
	
  var msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.messages-content')).addClass('new');
    setDate();
    $('.message-input').val(null);
    $('.messages-content').scrollTop( 1000 )
    me.sendingConnect.send(msg)
  
}

$('.message-submit').on('click',function() {
  alert("send pressed")
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    // return false;
  }
})



function fakeMessage(msg) {

  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="'+me.chatItem.connect.pictureUrl+'" /></figure><span></span></div>').appendTo($('.messages-content'));
  // updateScrollbar();

  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="'+me.chatItem.connect.pictureUrl+'" /></figure>' + msg + '</div>').appendTo($('.messages-content')).addClass('new');
    setDate();
    $('.messages-content').scrollTop(1000)
    // updateScrollbar();
    i++;
  }, 1000 + (Math.random() * 20) * 100);

}
}
setup(id){
  alert(id)
  this.people.updateChatId(this.chatItem.myId, id, (res)=>{
    console.log("done")
  })
  
}
}
