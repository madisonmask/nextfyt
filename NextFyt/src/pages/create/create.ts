import { Component,   Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CreatedExercisesPage} from '../createdexercises/createdexercises';

import {ShareWorkoutPage} from '../share-workout/share-workout';

import {Http} from "@angular/http";
import 'rxjs/add/operator/map';

import { APP_CONFIG, IAppConfig } from '../../app/app.config';
/**
 * Generated class for the Create page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-create',
    templateUrl: 'create.html',
})
export class CreatePage {

    MyExercises = [];
    config:IAppConfig;

    constructor(public navCtrl:NavController, public navParams:NavParams, public http:Http,
                @Inject(APP_CONFIG)  config:IAppConfig) {
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
        this.http.get(this.config.apiEndpoint + 'exercise').map(res => res.json())
            .subscribe(data => {
                this.MyExercises = data.exercises;
                console.log(data);

            });
    }


    CreateExercise() {
        this.navCtrl.push(CreatedExercisesPage);
    }

    ShareWorkout(){
        this.navCtrl.push(ShareWorkoutPage, {Exercises:this.MyExercises});

    }


}
