// call modal display

import { Component, Input } from '@angular/core';
import { ModalController, NavParams, Events, ViewController} from 'ionic-angular';
import { CallService } from '../../services/call';
import { PeopleService } from '../../providers/people-service';
import { RatingModal } from '../../pages/rating-modal/rating-modal'

@Component({
	templateUrl: 'call-modal.html',
	selector: 'modal-call'
})
export class CallModal {
	constructor(private modalCtrl:ModalController,private people:PeopleService, params: NavParams, private events: Events, private viewCtrl: ViewController, public callService: CallService) {
		this.events.subscribe('call.trigger.hide', data => {
			this.hide();
		});
	}

	hide() {
		this.events.publish('call.status.isincall', false);
		this.callService.refreshVideos();
		this.viewCtrl.dismiss();
	}

	ngOnInit() {
		this.events.publish('call.status.isincall', true);
	}
	endCall(){

		console.log("end call called", this.callService.contact.id)
		this.people.userById(this.callService.contact.id.toString(),(user)=>{
	         let pendingRatingModal = this.modalCtrl.create(RatingModal,{"userObject":user})
	        pendingRatingModal.present()
	        this.callService.end()
	      })
		
	}
}