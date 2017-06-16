import {Component, Inject} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {Camera} from '@ionic-native/camera';


import {Http, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';

import {APP_CONFIG, IAppConfig} from '../../app/app.config';
import {Storage} from "@ionic/storage";

//import {HomePage} from '../home/home';
import {CreatePage} from '../create/create'
import{UserService} from '../../services/User';


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
    config: IAppConfig;
    testRadioResult = {};
    IsAjaxLoaded: boolean = false;
    hashtag:string='';
    workoutToSend = {Name: '', Length: 30, Image: '', ImageData: '', Exercises: {}, Tags:[]}; //object what we are sended without imagedata
//@todo rewrite this
    Workout = {Name: '', Length: 30, Image: '', ImageData: '', Exercises: {},Tags:[]};

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private camera: Camera, public http: Http,
                @Inject(APP_CONFIG)  config: IAppConfig, private storage: Storage, private  user: UserService) {
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
            this.Workout.ImageData = imageData;
        }, (err) => {
            console.log(err);
        });
    }


    SaveWorkout() {
        if (this.IsAjaxLoaded == true) {
            return false;
        } else {
            this.IsAjaxLoaded = true;
            this.storage.ready().then(() => {
                this.storage.get('token').then(token => {
                    console.log(token);
                    //         let headers = new Headers();
                    //            headers.append('Authorization', 'Bearer ' + token);
                    let headers = new Headers({'Authorization': 'Bearer ' + token});
                    let options = new RequestOptions({headers: headers});

                    this.workoutToSend = this.Workout;
                    this.workoutToSend.Image = '';

                    this.http.post(this.config.apiEndpoint + 'workout', this.workoutToSend, options).map(res => res.json()) .subscribe(data => {
                        /*      let alert = this.alertCtrl.create({
                         title: 'data',
                         subTitle: data,
                         buttons: ['OK']
                         });
                         alert.present();*/
                        console.log(data);
                        this.IsAjaxLoaded = false;

                        if (data.error == false) {
                            let posts = this.user.getUserPosts();
                            this.user.setUserPosts(posts++);
                            this.navCtrl.setRoot(CreatePage);
                        }
                    });
                })
            })
        }
    }

    addTag(){

        this.Workout.Tags.push(this.hashtag);
        this.hashtag='';
    }


}
