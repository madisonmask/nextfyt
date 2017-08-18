import {Component, Inject} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import{WorkoutDetailsExerciseShowPage} from '../workout-details-exercise-show/workout-details-exercise-show';

import {Http, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';

import {APP_CONFIG, IAppConfig} from '../../app/app.config';
/**
 * Generated class for the WorkoutDetailsExercisesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-workout-details-exercises',
    templateUrl: 'workout-details-exercises.html',
})
export class WorkoutDetailsExercisesPage {


    Exercises = [];
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
        this.getExercise();


    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad WorkoutDetailsExercisesPage');
    }

    /**
     * @param {{exercises:Array}} data
     */
    getExercise() {
        this.IsAjaxLoaded = true;
        this.storage.ready().then(() => {
            this.storage.get('token').then(token => {
                console.log(token);

                let headers = new Headers({'Authorization': 'Bearer ' + token});
                let options = new RequestOptions({headers: headers});


                this.http.get(this.config.apiEndpoint + 'exercises/' + this.Workout.workoutId, options).map(res => res.json()).subscribe(data => {
                    this.IsAjaxLoaded = false;

                    this.Exercises = data.exercises;

                }, err => {
                    console.log(err);
                })
            })
        })

    }


    runExercise(exercise) {
        this.navCtrl.push(WorkoutDetailsExerciseShowPage, {exercise: exercise})
    }

    goBack(){
        this.navCtrl.pop();
    }


}
