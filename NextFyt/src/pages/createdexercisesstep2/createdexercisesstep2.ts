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

    Exercise = {
        Name: '',
        Filters: {enabled: false, Muscles: [], Cardio: false, Difficulty: [], Equipment: [], TimeLength: ''},
        Images: [],
        repeat_count:0,
        repeat_type:'movements',
        length_count:30,
        length_type:'Seconds'

    };

    FilterValues = {Muscles: [], Cardio: false, Difficulty: [], Equipment: []};

    IsAjaxLoaded: boolean = false;

    constructor(public navCtrl:NavController, public navParams:NavParams) {

     this.Exercise=   this.navParams.get('Exercise');

        this.FilterValues=   this.navParams.get('FilterValues');
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

    goToStages() {
        this.navCtrl.push(CreatedExercisesStagePage, {Exercise:this.Exercise});

    }

    goBack(){
        this.navCtrl.pop();
    }



}
