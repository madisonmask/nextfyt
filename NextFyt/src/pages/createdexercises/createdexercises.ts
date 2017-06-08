import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {  CreatedExercisesStep2Page } from '../createdexercisesstep2/createdexercisesstep2';

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
        Name:'',
        Filters: {enabled: false, Muscles: [], Cardio: false, Difficulty:'', Equipment: [], TimeLength: ''},
        Images:[]
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

        this.Exercise.Filters.Difficulty =  this.FilterValues.Difficulty[0].name;

        console.log(this.Exercise.Filters);
        this.FilterValues.Equipment = [{name: 'bands'},
            {name: 'barbell'},
            {name: 'cable'},
            {name: 'foam roll'},
        ];

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
        this.navCtrl.push(CreatedExercisesStep2Page, {Exercise:this.Exercise});
    }

    isformCorrect(){
    if(this.Exercise.Name==''){
            return false;
        }

        if(this.Exercise.Filters.Muscles.length==0){
            return false;
        }

        return true;



    }
}
