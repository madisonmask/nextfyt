import {Component} from '@angular/core';
import {ModalController, NavController, NavParams, ViewController  } from 'ionic-angular';


@Component({
    selector: 'search-filters',
    templateUrl: 'searchfilters.html'
})


export class SearchFilters {

    Searched = {
        SearchString: '',
        Filters: {enabled: false, Muscles: [], Cardio: false, Difficulty: [], Equipment: [], TimeLength: ''}
    };
    shouldShowCancel = true;
    FilterValues = {Muscles: {}, Cardio: false, Difficulty: {}, Equipment: {}};


    constructor(params:NavParams, public viewCtrl:ViewController) {
        //      console.log('UserId', params.get('userId'));

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

    dismiss() {
    //    let data = {'foo': 'bar'};
//        console.log(data);
        //       this.viewCtrl.dismiss(data);
  //      this.viewCtrl.dismiss({"foo": "bar"});

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




    ApplyFilter() {
        console.log('apply');

        this.viewCtrl.dismiss(this.Searched);
    }


}