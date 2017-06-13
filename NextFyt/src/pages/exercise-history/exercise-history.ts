import {Component, Inject} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';


import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {Storage} from "@ionic/storage";

import {APP_CONFIG, IAppConfig} from '../../app/app.config';


/**
 * Generated class for the ExerciseHistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-exercise-history',
    templateUrl: 'exercise-history.html',
})
export class ExerciseHistoryPage {

    MyExercises = [];
    config: IAppConfig;

    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
                @Inject(APP_CONFIG)  config: IAppConfig, private storage: Storage, public alertCtrl: AlertController) {
        this.config = config;

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ExerciseHistoryPage');
    }

    ionViewWillEnter() {
        console.log('ionViewWillEnter Create');
        this.updateExerciseList();
    }

    updateExerciseList() {
        this.storage.ready().then(() => {
            this.storage.get('token').then(token => {
                console.log(token);
                let headers = new Headers();
                headers.append('Authorization', 'Bearer ' + token);

                this.http.get(this.config.apiEndpoint + 'exercise', {
                    headers: headers
                }).map(res => res.json()).subscribe(data => {
                    this.MyExercises = data.exercises;
                    console.log(data);


                }, err => {
                    console.log(err);
                })
            })
        })
    }

    selectItem(item) {

    }


}
