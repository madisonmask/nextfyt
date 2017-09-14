import {Component, Inject} from '@angular/core';
import { NavParams, ViewController  } from 'ionic-angular';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import {APP_CONFIG, IAppConfig} from '../../app/app.config';

@Component({
    selector: 'search-filters',
    templateUrl: 'searchfilters.html'
})


export class SearchFilters {

    Searched = {
        SearchString: '',
        Filters: {enabled: false, Muscles: [], Cardio: false, Difficulty: [], Equipment: [],  TimeLength:"0"}
    };
    shouldShowCancel = true;
    FilterValues = {Muscles: [], Cardio: false, Difficulty: {}, Equipment: {}};

    IsAjaxLoaded: boolean = false;
    AllMuscles=[];

    constructor(params:NavParams, public viewCtrl:ViewController, public http: Http,
                @Inject(APP_CONFIG)  config: IAppConfig) {
        //      console.log('UserId', params.get('userId'));



        this.http.get(config.apiEndpoint + 'catalog').map(res => res.json())
            .subscribe(data => {
                //           this.MyExercises=data.exercises;
                console.log(data);
                this.FilterValues.Muscles = data.muscles;
                this.FilterValues.Difficulty = data.Difficulty;
                this.FilterValues.Equipment = data.equipment;
                console.log(this.FilterValues.Difficulty);
            });













        /*

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

        */
    }

    dismiss() {
    //    let data = {'foo': 'bar'};
//        console.log(data);

        this.Searched.Filters.enabled=false;
          this.viewCtrl.dismiss();
  //      this.viewCtrl.dismiss({"foo": "bar"});

    }

    SelectMuscles(item) {
        console.log('select muscle');
        console.log(item);
        console.log(this.Searched);
        console.log(this.Searched.Filters.Muscles);
        console.log(this.AllMuscles);
        if (this.Searched.Filters.Muscles.indexOf(item) == -1) {
            this.Searched.Filters.Muscles.push(item);
      //     console.log('push');
        } else {
            this.Searched.Filters.Muscles.splice(this.Searched.Filters.Muscles.indexOf(item), 1);
        }

     //   this.checkMuscles(item);
this.checkEnabledMuscles();

    }

    checkEnabledMuscles(){

        console.log(this.AllMuscles);

        this.FilterValues.Muscles.forEach(function (item) {
            console.log("firms check!"+ item.id);
            console.log(this[item.id])



        },this.AllMuscles);


    }

    checkMuscles(item) {
        console.log('check muscle');
        console.log(item);
        console.log(this.Searched.Filters.Muscles);
        if (this.Searched.Filters.Muscles.indexOf(item) == -1) {
            console.log('false');
            return false;
        } else {
            console.log('TRUE');
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
        this.Searched.Filters.enabled=true;

        console.log(this.Searched);
        this.viewCtrl.dismiss(this.Searched);
    }


}