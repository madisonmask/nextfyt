import {Component, Inject} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {CreatedExercisesPage} from '../createdexercises/createdexercises';
import {ExerciseDefaultPage} from '../exercise-default/exercise-default';
import {ExerciseHistoryPage} from '../exercise-history/exercise-history';

import {ShareWorkoutPage} from '../share-workout/share-workout';


import {Http, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';
import {Storage} from "@ionic/storage";

import {APP_CONFIG, IAppConfig} from '../../app/app.config';
/**
 * Generated class for the Create page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-create',
    templateUrl: 'create.html',
})
export class CreatePage {

    MyExercises = [];
    config: IAppConfig;
    swiped=1;
    IsAjaxLoaded:boolean = false;
    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
                @Inject(APP_CONFIG)  config: IAppConfig, private storage: Storage, public alertCtrl: AlertController) {
        this.config = config;

    }

//https://ionicframework.com/docs/api/navigation/NavController/
    ionViewDidLoad() {
        console.log('ionViewDidLoad Create');
    }

    ionViewWillEnter() {
        console.log('ionViewWillEnter Create');
        this.updateExerciseList();
    }

    ionViewDidEnter() {
        console.log('ionViewDidEnter Create');
    }

    ionViewWillLeave() {
        console.log('ionViewWillLeave Create');
    }

    ionViewDidLeave() {
        console.log('ionViewDidLeave Create');
    }

    ionViewCanEnter() {
        console.log('ionViewCanEnter Create');
    }

    ionViewCanLeave() {
        console.log('ionViewCanLeave Create');
    }


    updateExerciseList() {
        this.IsAjaxLoaded=true;
        this.storage.ready().then(() => {
            this.storage.get('token').then(token => {
                console.log(token);
        /*        let headers = new Headers();
                headers.append('Authorization', 'Bearer ' + token);
             */
                let headers = new Headers({'Authorization': 'Bearer ' + token});
                let options = new RequestOptions({ headers: headers });

                this.http.get(this.config.apiEndpoint + 'exercise/new', options).map(res => res.json()).subscribe(data => {
                    this.MyExercises = data.exercises;
                    console.log(data);

                    this.IsAjaxLoaded=false;
                }, err => {
                    console.log(err);
                })
            })
        })
    }


    CreateExercise() {
        let alert = this.alertCtrl.create();
        alert.setTitle('Exercise type');
        alert.addInput({
            type: 'radio',
            label: 'past created exercises',
            value: 'history',
            checked: true
        });

        alert.addInput({
            type: 'radio',
            label: 'default exercises',
            value: 'default',
            checked: false
        });

        alert.addInput({
            type: 'radio',
            label: 'Create new',
            value: 'new',
            checked: false
        });


        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: data => {
                console.log('Radio data:', data);
                //    this.testRadioOpen = false;
                //    this.testRadioResult = data;
                if (data == 'new') {
                    this.navCtrl.push(CreatedExercisesPage);
                } else if (data == 'history') {
                    this.navCtrl.push(ExerciseHistoryPage);
                } else {
                    this.navCtrl.push(ExerciseDefaultPage);
                }

            }
        });
        alert.present().then(() => {
            //      this.testRadioOpen = true;
        });


        //   this.navCtrl.push(CreatedExercisesPage);
    }

    ShareWorkout() {
        this.navCtrl.push(ShareWorkoutPage, {Exercises: this.MyExercises});

    }

    delete(exercise){
        this.MyExercises.splice( this.MyExercises.indexOf(exercise), 1  );
        this.storage.ready().then(() => {
            this.storage.get('token').then(token => {
                console.log(token);

                let headers = new Headers({'Authorization': 'Bearer ' + token});
                let options = new RequestOptions({ headers: headers });

                this.http.post(this.config.apiEndpoint + 'exercise/makeold', {exercise:exercise.id}, options).map(res => res.json()).subscribe(data => {
                 console.log(data);
                }, err => {
                    console.log(err);
                })
            })
        })
     //   this.MyExercises.splice( this.MyExercises.indexOf(exercise) , 1  );
    }

}
