// audio handler for native audio with fallback for html5 audio

import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { Config } from '../app/config';

@Injectable()
export class AudioService {
	ready = null;
	audio = []
	volume = 1

	constructor(public platform: Platform, private nativeAudio: NativeAudio) {

		this.ready = new Promise((resolve, reject) => {

			// promise that only fires after all files have loaded
			platform.ready().then(() => {
				let files = ['login','message-received-back','message-received-front','message-sent','calling'];
				let c = 1;

				if (this.platform.is('cordova')) {
					files.forEach(file => {
						this.nativeAudio.preloadSimple(file, 'assets/audio/' + file + '.mp3').then(msg => {
							c++;
							if (c == files.length) {
								setTimeout(resolve, 100);
							}
						}, msg => {
							reject('failed to load audio');
							console.debug('ERROR loading sound: ' + msg);
						});
					});
				} else {
					files.forEach(file => {
						this.audio[file] = new Audio('assets/audio/' + file + '.mp3');
						this.audio[file].volume = this.volume;
					});
					resolve();
				}
			});
		});

		this.ready.then(() => {
			console.debug('Audio initilized.');
		});
	}

	// play an audio clip
	public play(clip) {
		if (!Config.audio) {
			return;
		}


		if (this.platform.is('cordova')) {
			if(clip==="calling")
				this.nativeAudio.loop(clip)
			else
			this.nativeAudio.play(clip);
		} else if (this.audio[clip]) {
			this.audio[clip].play();
		}

	}
	public stopAudioCalling(){
		this.nativeAudio.stop('calling')
	}


}