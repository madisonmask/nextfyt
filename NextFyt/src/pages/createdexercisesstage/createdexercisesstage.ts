//https://github.com/ionic-team/ionic-view-issues/issues/192


import { Component,  Inject } from '@angular/core';
import {  NavController, NavParams,  AlertController} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';


import {DomSanitizer} from '@angular/platform-browser';

import {Http} from "@angular/http";
import 'rxjs/add/operator/map';

import { APP_CONFIG, IAppConfig } from '../../app/app.config';


/**
 * Generated class for the Savedlist page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-createdexercisesstage',
    templateUrl: 'createdexercisesstage.html',
})
export class CreatedExercisesStagePage {

    public base64Image:string;
    testRadioOpen = false;
    config:IAppConfig;
    testRadioResult = {};
    ExcerciseImage = [];
    Exercise = {
        Name: '',
        Filters: {enabled: false, Muscles: [], Cardio: false, Difficulty: [], Equipment: [], TimeLength: ''},
        Images: [],
        repeat_count:0,
        repeat_type:'movements',
        length_count:30,
        length_type:'Seconds'

    };
    IsAjaxLoaded:boolean = false;

    constructor(public navCtrl:NavController, public navParams:NavParams, private camera:Camera, public alertCtrl:AlertController,
                public _DomSanitizationService:DomSanitizer, public http:Http,
                @Inject(APP_CONFIG)  config:IAppConfig) {

        this.Exercise = this.navParams.get('Exercise');
        console.log(this.Exercise);
        this.config = config;

    }


    takePicture(number) {
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 1000,
            targetHeight: 1000
        }).then((imageData) => {
            // imageData is a base64 encoded string
            this.ExcerciseImage[number] = "data:image/jpeg;base64," + imageData;
            this.Exercise.Images[number] = imageData;
        }, (err) => {
            console.log(err);
        });
    }


    selectFromGalery(number) {
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        }).then((imageData) => {
            // imageData is a base64 encoded string
            this.ExcerciseImage[number] = "data:image/jpeg;base64," + imageData;
            this.Exercise.Images[number] = imageData;
        }, (err) => {
            console.log(err);
        });
    }


    showRadio(number) {
        let alert = this.alertCtrl.create();
        alert.setTitle('Lightsaber color');
        alert.addInput({
            type: 'radio',
            label: 'Take a Photo',
            value: 'camera',
            checked: true
        });

        alert.addInput({
            type: 'radio',
            label: 'Select from galery',
            value: 'galery',
            checked: false
        });

        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: data => {
                console.log('Radio data:', data);
                this.testRadioOpen = false;
                this.testRadioResult = data;
                if (data == 'camera') {
                    this.takePicture(number);
                } else {
                    this.selectFromGalery(number);
                }

            }
        });
        alert.present().then(() => {
            this.testRadioOpen = true;
        });


    }

    publish() {
        this.IsAjaxLoaded = true;
        this.http.post(this.config.apiEndpoint + 'exercise', this.Exercise).map(res => res.json()) .subscribe(data => {
             /*      let alert = this.alertCtrl.create({
                        title: 'data',
                        subTitle: data,
                        buttons: ['OK']
                    });
                    alert.present();*/
                console.log(data);
                this.IsAjaxLoaded = false;
            });

    }

    showPrompt() {
        let prompt = this.alertCtrl.create({
            title: 'Publish Exercise',
            message: "Are you ready to publish your new creation?",
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Publish',
                    handler: data => {
                        console.log('Publish clicked');
                        this.publish();
                    }
                }
            ]
        });
        prompt.present();
    }


}
