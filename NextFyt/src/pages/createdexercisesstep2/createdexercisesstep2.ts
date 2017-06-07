import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {CreatedExercisesStagePage} from  '../createdexercisesstage/createdexercisesstage';

/**
 * Generated class for the Savedlist page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-createdexercisesstep2',
    templateUrl: 'createdexercisesstep2.html',
})
export class CreatedExercisesStep2Page {

    Searched = {
        SearchString: '',
        Filters: {enabled: false, Muscles: [], Cardio: false, Difficulty: [], Equipment: [], TimeLength: ''}
    };

    FilterValues = {Muscles: {}, Cardio: false, Difficulty: {}, Equipment: {}};

    constructor(public navCtrl:NavController, public navParams:NavParams) {
        this.FilterValues.Muscles = [{name: 'ABS'},
            {name: 'Chest'},
            {name: 'Biceps'},
            {name: 'Calves'},
            {name: 'Forearms'},
            {name: 'Glutes'}
        ];

        this.FilterValues.Difficulty = [{name: 'beginer'},
            {name: 'intermediate'},
            {name: 'advanced'}
        ];

        this.FilterValues.Equipment = [{name: 'bands'},
            {name: 'barbell'},
            {name: 'cable'},
            {name: 'foam roll'},
        ];

    }


    SelectMuscles(item) {
        if (this.Searched.Filters.Muscles.indexOf(item) == -1) {
            this.Searched.Filters.Muscles.push(item);
        } else {
            this.Searched.Filters.Muscles.splice(this.Searched.Filters.Muscles.indexOf(item), 1);
        }
    }

    checkMuscles(item) {
        if (this.Searched.Filters.Muscles.indexOf(item) == -1) {
            return false;
        } else {
            return true;
        }
    }

    SelectDifficulty(item) {
        if (this.Searched.Filters.Difficulty.indexOf(item) == -1) {
            this.Searched.Filters.Difficulty.push(item);
        } else {
            this.Searched.Filters.Difficulty.splice(this.Searched.Filters.Difficulty.indexOf(item), 1);
        }
    }

    checkDifficulty(item) {
        if (this.Searched.Filters.Difficulty.indexOf(item) == -1) {
            return false;
        } else {
            return true;
        }
    }


    SelectEquipment(item) {
        if (this.Searched.Filters.Equipment.indexOf(item) == -1) {
            this.Searched.Filters.Equipment.push(item);
        } else {
            this.Searched.Filters.Equipment.splice(this.Searched.Filters.Equipment.indexOf(item), 1);
        }
    }

    checkEquipment(item) {
        if (this.Searched.Filters.Equipment.indexOf(item) == -1) {
            return false;
        } else {
            return true;
        }
    }

    goToStages() {
        this.navCtrl.push(CreatedExercisesStagePage);

    }

}
