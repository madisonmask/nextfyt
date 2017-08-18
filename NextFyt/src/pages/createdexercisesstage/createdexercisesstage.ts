//https://github.com/ionic-team/ionic-view-issues/issues/192


import { Component,  Inject } from '@angular/core';
import {  NavController, NavParams,  AlertController, ToastController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';


import {DomSanitizer} from '@angular/platform-browser';

import {Http, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';

import { APP_CONFIG, IAppConfig } from '../../app/app.config';

import {CreatePage } from  '../create/create';
import {Storage} from "@ionic/storage";


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
                public _DomSanitizationService:DomSanitizer, public http:Http,  private storage: Storage,
                @Inject(APP_CONFIG)  config:IAppConfig, public toastCtrl: ToastController) {

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
/*
    publish() {
        this.IsAjaxLoaded = true;

        this.http.post(this.config.apiEndpoint + 'exercise', this.Exercise).map(res => res.json()) .subscribe(data => {

                console.log(data);
                this.IsAjaxLoaded = false;

            this.navCtrl.setRoot(CreatePage);
            });

    }
*/
    publish() {

        console.log(this.ExcerciseImage.length);

        if(this.ExcerciseImage.length>=2){

            this.IsAjaxLoaded = true;
            this.storage.ready().then(() => {
                this.storage.get('token').then(token => {
                    console.log(token);
                    //         let headers = new Headers();
                    //            headers.append('Authorization', 'Bearer ' + token);
                    let headers = new Headers({'Authorization': 'Bearer ' + token});
                    let options = new RequestOptions({ headers: headers });
                    this.http.post(this.config.apiEndpoint + 'exercise', this.Exercise, options).map(res => res.json()) .subscribe(data => {



                        console.log(data);
                        this.IsAjaxLoaded = false;

                        this.navCtrl.setRoot(CreatePage);
                    });


                })
            })

        }else{
console.log('show toastr');
            let toast = this.toastCtrl.create({
                message: 'Plaese  enter at least 2 photo',
                duration: 2000,
                position: 'middle'
            });

            toast.present(toast);


        }



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


    goBack(){
        this.navCtrl.pop();
    }





}
