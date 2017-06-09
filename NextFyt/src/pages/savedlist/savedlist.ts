import { Component, Inject } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';


import {Http} from "@angular/http";
import 'rxjs/add/operator/map';

import { APP_CONFIG, IAppConfig } from '../../app/app.config';



/**
 * Generated class for the Savedlist page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-savedlist',
    templateUrl: 'savedlist.html',
})
export class SavedListPage {

    isMySaved = true;
    config:IAppConfig;

    createdList = [ ];

    favoritedList = [{
        author: 'User1',
        name: 'Lorem',
        skill: 'adv',
        muscles: 'all',
        cardio: false,
        image: 'http://via.placeholder.com/350x150'
    },
        {
            author: 'User2',
            name: 'Chest',
            skill: 'adv',
            muscles: 'all',
            cardio: false,
            image: 'http://via.placeholder.com/350x150'
        },
        {
            author: 'user3',
            name: 'Big Cardio',
            skill: 'heart',
            muscles: 'heart',
            cardio: true,
            image: 'http://via.placeholder.com/350x150'
        }
    ];

    ActiveList = this.createdList;


    constructor(public navCtrl:NavController, public navParams:NavParams,  public http:Http,
                @Inject(APP_CONFIG)  config:IAppConfig
    ) {

        this.config=config;
        this.getMyWorkouts();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Savedlist');
    }

    ShowSaved(type) {
        console.log(type);

        if (type == 'My') {
            this.getMyWorkouts();
            this.isMySaved = true;
            this.ActiveList = this.createdList;
        } else {
            this.isMySaved = false;
            this.ActiveList = this.favoritedList;
        }

    }

    itemSelected(item) {
        console.log(item);
    }



    getMyWorkouts(){
        this.http.get(this.config.apiEndpoint + 'workouts/my').map(res => res.json())
            .subscribe(data => {
                this.createdList = data.workouts;
                console.log(data);
                this.ActiveList = this.createdList;
            });
    }
}
