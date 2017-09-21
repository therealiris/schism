// display list of contacts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, ModalController, Events } from 'ionic-angular';
import { ChatPage, AccountPage, ChatsPage } from '../';
import { ContactModal } from '../../components';
import { LoginService, ContactService, ChatService } from '../../services';
import { Tutorial } from '../tutorial/tutorial';
import { DiscoverPage } from '../discover/discover';
import { PlannerTwo } from '../planner2/plannerTwo';
import { PeopleService } from '../../providers/people-service';
import { Storage } from '@ionic/storage';
var ContactsPage = ContactsPage_1 = (function () {
    function ContactsPage(storage, people, events, chatService, modalCtrl, navCtrl, loginService, contactService) {
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
        var _this = this;
        this.storage = storage;
        this.people = people;
        this.events = events;
        this.chatService = chatService;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.loginService = loginService;
        this.contactService = contactService;
        this.events.publish("clearHamNotification");
        this.events.publish("refreshContacts");
        this.contactList = contactService.contacts;
        console.debug('Contacts: ', contactService.contacts);
        storage.get('contactsTutorial').then(function (val) {
            if (val) {
                var tut = _this.modalCtrl.create(Tutorial, { "type": "connections" });
                tut.present();
                tut.onDidDismiss(function () {
                    _this.storage.set('contactsTutorial', false);
                });
            }
        });
    }
    // tap and hold contact card
    ContactsPage.prototype.contactCard = function (contact) {
        var modal = this.modalCtrl.create(ContactModal, { contact: contact });
        modal.present();
    };
    // go to accounts
    ContactsPage.prototype.account = function () {
        this.navCtrl.push(AccountPage, {}, { animate: true, direction: 'forward' });
    };
    // go to a chat
    ContactsPage.prototype.chat = function (id, item) {
        var _this = this;
        var name = "", designation = "", username = "";
        this.contactList.forEach(function (con) {
            if (con.id === id) {
                name = con.name;
                designation = con.designation;
                username = con.username;
                con.unread = false;
            }
        });
        item.close();
        this.events.publish("clearUnread", { "id": id });
        console.log(id);
        this.chatService.getChatByContact(id).then(function (chat) {
            console.debug('Pushing to chat: ', chat);
            _this.navCtrl.push(ChatPage, { chatId: chat.id, "name": name, "designation": designation, "username": username }, { animate: true, direction: 'forward' });
        });
    };
    ContactsPage.prototype.goChats = function (id) {
        this.navCtrl.setRoot(ChatsPage, {}, { animate: true, direction: 'forward' });
    };
    ContactsPage.prototype.goDiscover = function () {
        this.navCtrl.setRoot(DiscoverPage);
    };
    ContactsPage.prototype.schedule = function (type) {
        var _this = this;
        var planModal = this.modalCtrl.create(PlannerTwo, {
            "type": type
        });
        planModal.present();
        planModal.onDidDismiss(function () {
            _this.navCtrl.setRoot(ContactsPage_1);
        });
    };
    return ContactsPage;
}());
ContactsPage = ContactsPage_1 = __decorate([
    Component({
        selector: 'page-contacts',
        templateUrl: 'contacts.html'
    }),
    __metadata("design:paramtypes", [Storage, PeopleService, Events, ChatService, ModalController, NavController, LoginService, ContactService])
], ContactsPage);
export { ContactsPage };
var ContactsPage_1;
//# sourceMappingURL=contacts.js.map