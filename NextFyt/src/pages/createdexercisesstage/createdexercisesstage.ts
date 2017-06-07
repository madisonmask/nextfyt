//https://github.com/ionic-team/ionic-view-issues/issues/192


import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';

import {DomSanitizer} from '@angular/platform-browser';

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
    testRadioResult = {};
    ExcerciseImage=[];


    constructor(public navCtrl:NavController, public navParams:NavParams, private camera:Camera, public alertCtrl:AlertController, public _DomSanitizationService: DomSanitizer) {
    }


    takePicture(number) {
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 1000,
            targetHeight: 1000
        }).then((imageData) => {
            // imageData is a base64 encoded string

     //       imageData.replace(/(\r\n|\n|\r)/gm,"");


       //     this.base64Image = "data:image/jpeg;base64," + imageData;
            this.ExcerciseImage[number]="data:image/jpeg;base64," + imageData;
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
//            this.base64Image = "data:image/jpeg;base64," + imageData;
            this.ExcerciseImage[number]="data:image/jpeg;base64," + imageData;
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

    publish(){


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
                        console.log('Saved clicked');
                    }
                }
            ]
        });
        prompt.present();
    }





}
