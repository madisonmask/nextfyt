import {Component, Inject} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";

import {Http, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';

import {APP_CONFIG, IAppConfig} from '../../app/app.config';
import {WorkoutDetailsExercisesPage} from '../workout-details-exercises/workout-details-exercises';

/**
 * Generated class for the WorkoutDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-workout-details',
    templateUrl: 'workout-details.html',
})
export class WorkoutDetailsPage {

    Workout = {
        author: '',
        countLikes: 0,
        image: '',
        name: '',
        skill: '',
        muscles: [],
        cardio: '',
        Time: 0,
        equipment: [],
        Tags: [],
        workoutId: 0
    };
    IsAjaxLoaded: boolean = false;
    config: IAppConfig;

    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
                @Inject(APP_CONFIG)  config: IAppConfig, private storage: Storage) {

        console.log(this.navParams.get('workout'));
        this.Workout = this.navParams.get('workout');
        this.config = config;
        this.getWorkout();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad WorkoutDetailsPage');
    }


    getWorkout() {
        this.IsAjaxLoaded = true;
        this.storage.ready().then(() => {
            this.storage.get('token').then(token => {
                console.log(token);

                let headers = new Headers({'Authorization': 'Bearer ' + token});
                let options = new RequestOptions({headers: headers});


                this.http.get(this.config.apiEndpoint + 'workout/' + this.Workout.workoutId, options).map(res => res.json()).subscribe(data => {
                    this.IsAjaxLoaded = false;

                    this.Workout = data.workout;

                }, err => {
                    console.log(err);
                })
            })
        })

    }


    runWorkout(){
        this.navCtrl.push(WorkoutDetailsExercisesPage,{workout:this.Workout})
    }



}
