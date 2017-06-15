import {Component, Inject} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';


import {Http, Headers, RequestOptions} from "@angular/http";
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


                let headers = new Headers({'Authorization': 'Bearer ' + token});
                let options = new RequestOptions({ headers: headers });



                this.http.get(this.config.apiEndpoint + 'exercises', options).map(res => res.json()).subscribe(data => {
                    this.MyExercises = data.exercises;
                    console.log(data);


                }, err => {
                    console.log(err);
                })
            })
        })
    }


    selectItem(item) {
        this.storage.ready().then(() => {
            this.storage.get('token').then(token => {
                console.log(token);
                //         let headers = new Headers();
                //     headers.append('Authorization', 'Bearer ' + token);

                let headers = new Headers({'Authorization': 'Bearer ' + token});
                let options = new RequestOptions({headers: headers});
                console.log(item);
                let data = {exercise: item.id};
                console.log(data);
                this.http.post(this.config.apiEndpoint + 'exercise/makenew', data, options).map(res => res.json()).subscribe(data => {
                    console.log(data);
                    if (data.error == false) {
                        this.navCtrl.pop();

                    }
                }, err => {
                    console.log(err);
                })
            })
        })
    }

    delete(exercise){
        this.MyExercises.splice( this.MyExercises.indexOf(exercise),1  );
        this.storage.ready().then(() => {
            this.storage.get('token').then(token => {
                console.log(token);


                let headers = new Headers({'Authorization': 'Bearer ' + token});
                let options = new RequestOptions({ headers: headers });


                this.http.delete(this.config.apiEndpoint + 'exercise/'+exercise.id,  options).map(res => res.json()).subscribe(data => {
                    console.log(data);
                }, err => {
                    console.log(err);
                })
            })
        })

    }




}
