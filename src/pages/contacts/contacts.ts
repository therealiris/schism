// display list of contacts

import { Component } from '@angular/core';
import { NavController, ModalController,Events } from 'ionic-angular';
import { ChatPage, AccountPage, ChatsPage } from '../';
import { ContactModal } from '../../components';
import { LoginService, ContactService, ChatService } from '../../services';
import { Tutorial } from '../tutorial/tutorial'
import { DiscoverPage } from '../discover/discover'
import { PlannerTwo } from '../planner2/plannerTwo'
import { CalendarPage } from '../calendar/calendar'
import { PeopleService } from '../../providers/people-service'
import { Storage } from '@ionic/storage';
import { ItemSliding } from 'ionic-angular';
@Component({
	selector: 'page-contacts',
	templateUrl: 'contacts.html'
})

export class ContactsPage {

contactList: any;
tutorial : boolean;
clicked : boolean;
	constructor(private storage:Storage,private people:PeopleService,public events:Events,private chatService: ChatService, private modalCtrl: ModalController, private navCtrl: NavController, private loginService: LoginService, public contactService: ContactService) {
		// contacts / chats list state
		// loginService.complete.then(user => {
		// 	console.debug('login complete');
		// 	if (!user.id) {
		// 		loginService.go();
		// 	}
		// }, () => {
		// 	console.debug('login faile');
		// 	loginService.go();
		// });
		this.clicked = false
	    this.events.publish("clearHamNotification")
		this.events.publish("refreshContacts");
		this.contactList = contactService.contacts
		console.debug('Contacts: ', contactService.contacts);
		storage.get('contactsTutorial').then((val)=>{
	      if(val)
	      {
	        let tut = this.modalCtrl.create(Tutorial,{"type":"connections"})
	   		tut.present()
	        tut.onDidDismiss(()=>{
	          this.storage.set('contactsTutorial',false)
	        })
	      }
	    });
	}

	// tap and hold contact card
	contactCard(contact) {
		let modal = this.modalCtrl.create(ContactModal, {contact: contact});
		modal.present();
	}

	// go to accounts
	account() {
		this.navCtrl.push(AccountPage, {}, {animate: true, direction: 'forward'});
	}

	// go to a chat
	chat(id) {
		if(!this.clicked){
			this.clicked = true
		
		let name = "", designation= "", username = "" 
		this.contactList.forEach(con=>{
			if(con.id === id){
				name = con.name
				designation = con.designation
				username = con.username
				con.unread = false
			}
		})
		// item.close()
		
		console.log(id)
		this.chatService.getChatByContact(id).then((chat:any) => {
			this.clicked = false
			// console.debug('Pushing to chat: ', chat)

			this.navCtrl.push(ChatPage, {chatId: chat.id, "name":name,"designation":designation, "username":username}, {animate: true, direction: 'forward'});
		});
		}
	}

	goChats(id) {
		this.navCtrl.setRoot(ChatsPage, {}, {animate: true, direction: 'forward'});
	}
	goDiscover(){
		this.navCtrl.setRoot(DiscoverPage)
	}
	schedule(type){
    
    let planModal = this.modalCtrl.create(PlannerTwo,{
      "type": type
    });
    planModal.present()
    planModal.onDidDismiss(()=>{
      this.navCtrl.setRoot(ContactsPage)
    })
  }

}