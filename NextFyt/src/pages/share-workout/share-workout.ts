import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';



import {Http} from "@angular/http";
import 'rxjs/add/operator/map';

import { APP_CONFIG, IAppConfig } from '../../app/app.config';


/**
 * Generated class for the ShareWorkoutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-share-workout',
    templateUrl: 'share-workout.html',
})
export class ShareWorkoutPage {


    testRadioOpen = false;
     config:IAppConfig;
    testRadioResult = {};
    IsAjaxLoaded:boolean = false;
    workoutToSend=  {Name: '', Length: '', Image: '', ImageData:'', Exercises:{}}; //object what we are sended without imagedata
//@todo rewrite this
    Workout = {Name: '', Length: '', Image: '', ImageData:'', Exercises:{}};

    constructor(public navCtrl:NavController, public navParams:NavParams, public alertCtrl:AlertController, private camera:Camera, public http:Http,
                @Inject(APP_CONFIG)  config:IAppConfig) {
        this.config = config;

    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad ShareWorkoutPage');
    }

    ionViewWillEnter() {
        console.log('ionViewWillEnter Create');
        this.Workout.Exercises = this.navParams.get('Exercises');
    }




    showRadio() {
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
                    this.takePicture();
                } else {
                    this.selectFromGalery();
                }

            }
        });
        alert.present().then(() => {
            this.testRadioOpen = true;
        });
    }


    takePicture() {
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 1000,
            targetHeight: 1000
        }).then((imageData) => {
            // imageData is a base64 encoded string
            this.Workout.Image = "data:image/jpeg;base64," + imageData;
            this.Workout.ImageData = imageData;
        }, (err) => {
            console.log(err);
        });
    }


    selectFromGalery() {
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        }).then((imageData) => {
            // imageData is a base64 encoded string
            this.Workout.Image = "data:image/jpeg;base64," + imageData;
            this.Workout.ImageData= imageData;
        }, (err) => {
            console.log(err);
        });
    }


    SaveWorkout(){

       this.workoutToSend= this.Workout;
        this.workoutToSend.Image='';

        this.IsAjaxLoaded = true;
        this.http.post(this.config.apiEndpoint + 'workout', this.workoutToSend).map(res => res.json()) .subscribe(data => {
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


}
