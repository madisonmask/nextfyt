import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

/**
 * Generated class for the Search page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-search',
    templateUrl: 'search.html',
})
export class SearchPage {
    Searched = {SearchString: '', Filters: {enabled:false, Muscles: {}, Cardio: false, Difficulty: {}, Equipment: {}, TimeLength:''}};
    shouldShowCancel = true;
    FilterValues = {Muscles: {}, Cardio: false, Difficulty: {}, Equipment: {}};


    onInput(event) {
        console.log('on input');
        console.log(event);

    }

    onCancel(event) {
        console.log('on input');
        console.log(event);

    }

    SelectMuscles(item) {


        console.log(item);
    }

    SelectDifficulty(item) {
        console.log(item);
    }

    SelectEquipment(item) {
        console.log(item);
    }

    ApplyFilter(){
        console.log('apply');
    }
    constructor(public navCtrl: NavController) {

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


}
