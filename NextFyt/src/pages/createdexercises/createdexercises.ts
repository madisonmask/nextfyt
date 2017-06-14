import {Component, Inject} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {CreatedExercisesStep2Page} from '../createdexercisesstep2/createdexercisesstep2';


import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import {APP_CONFIG, IAppConfig} from '../../app/app.config';
/**
 * Generated class for the Savedlist page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-createdexercises',
    templateUrl: 'createdexercises.html',
})
export class CreatedExercisesPage {

    Exercise = {
        Name: '',
        Filters: {enabled: false, Muscles: [], Cardio: false, Difficulty: [], Equipment: [], TimeLength: ''},
        Images: [],
        repeat_count: 0,
        repeat_type: 'movements',
        length_count: 30,
        length_type: 'Seconds'

    };

    FilterValues = {Muscles: [], Cardio: false, Difficulty: [], Equipment: []};

    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
                @Inject(APP_CONFIG)  config: IAppConfig) {


        this.http.get(config.apiEndpoint + 'catalog').map(res => res.json())
            .subscribe(data => {
                //           this.MyExercises=data.exercises;
                console.log(data);
                this.FilterValues.Muscles = data.muscles;
                this.FilterValues.Difficulty = data.Difficulty;
                this.FilterValues.Equipment = data.equipment;
                this.Exercise.Filters.Difficulty = this.FilterValues.Difficulty[0].name;
                console.log(this.FilterValues.Difficulty);
            });
        /*

         this.FilterValues.Muscles = [{name: 'ABS', id:1},
         {name: 'Chest'},
         {name: 'Biceps'},
         {name: 'Calves'},
         {name: 'Forearms'},
         {name: 'Glutes'}
         ];
         */
        /*
         this.FilterValues.Difficulty = [{name: 'beginer', id:1},
         {name: 'intermediate', id:2},
         {name: 'advanced', id:3}
         ];

         console.log(this.FilterValues.Difficulty); */
        /*      this.Exercise.Filters.Difficulty =  this.FilterValues.Difficulty[0].name;


         this.FilterValues.Equipment = [{name: 'bands'},
         {name: 'barbell'},
         {name: 'cable'},
         {name: 'foam roll'},
         ];
         */
    }


    SelectMuscles(item) {
        if (this.Exercise.Filters.Muscles.indexOf(item) == -1) {
            this.Exercise.Filters.Muscles.push(item);
        } else {
            this.Exercise.Filters.Muscles.splice(this.Exercise.Filters.Muscles.indexOf(item), 1);
        }
    }

    checkMuscles(item) {
        if (this.Exercise.Filters.Muscles.indexOf(item) == -1) {
            return false;
        } else {
            return true;
        }
    }

    /*
     SelectDifficulty(item) {
     if (this.Exercise.Filters.Difficulty.indexOf(item) == -1) {
     this.Exercise.Filters.Difficulty.push(item);
     } else {
     this.Exercise.Filters.Difficulty.splice(this.Exercise.Filters.Difficulty.indexOf(item), 1);
     }
     }

     checkDifficulty(item) {
     if (this.Exercise.Filters.Difficulty.indexOf(item) == -1) {
     return false;
     } else {
     return true;
     }
     }

     */
    SelectEquipment(item) {
        if (this.Exercise.Filters.Equipment.indexOf(item) == -1) {
            this.Exercise.Filters.Equipment.push(item);
        } else {
            this.Exercise.Filters.Equipment.splice(this.Exercise.Filters.Equipment.indexOf(item), 1);
        }
    }

    checkEquipment(item) {
        if (this.Exercise.Filters.Equipment.indexOf(item) == -1) {
            return false;
        } else {
            return true;
        }
    }


    goToStep2() {
        this.navCtrl.push(CreatedExercisesStep2Page, {Exercise: this.Exercise, FilterValues: this.FilterValues});
    }

    isformCorrect() {
        if (this.Exercise.Name == '') {
            return false;
        }

        if (this.Exercise.Filters.Muscles.length == 0) {
            return false;
        }

        return true;


    }
}
