import {Component, Inject} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SavedListPage} from '../savedlist/savedlist'
//import {CreatePage} from '../create/create'
import {AuthService} from '../../services/auth';
import {UserService} from '../../services/User'
import {LoginPage} from '../login/login';
import {WorkoutDetailsPage} from '../workout-details/workout-details';
import {Storage} from "@ionic/storage";

import {Http, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';

import {APP_CONFIG, IAppConfig} from '../../app/app.config';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

//    SavedListPage1 = SavedListPage;
    // CreatePage1=CreatePage;
    config: IAppConfig;
    Followers = [];
    IsAjaxLoaded: boolean = false;

    constructor(public navCtrl: NavController, public  Auth: AuthService, public user: UserService, public http: Http,
                @Inject(APP_CONFIG)  config: IAppConfig, private storage: Storage) {
        this.config = config;
        this.getFollowers();

    }

    goSaved() {
        console.log('go saved');
        this.navCtrl.push(SavedListPage);
    }

    ionViewWillEnter() {
        this.IsAjaxLoaded = true;
        //   var CurUser: any;
        console.log('ionViewWillEnter Create');
        if (this.user.getData().id == 0) {
            console.log('We dont have user data');
            this.Auth.getProfile().then(data=> {
                console.log(data);
                this.IsAjaxLoaded = false;
                if (data.id == 0) {
                    console.log('User not logined');
                    this.navCtrl.setRoot(LoginPage);
                }
            })
        } else {
            this.IsAjaxLoaded = false;
            console.log('User logined');
            return true;
        }
        console.log();
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad Create');
    }

    /*
     ionViewWillEnter() {
     console.log('ionViewWillEnter Create');

     }*/

    ionViewDidEnter() {
        console.log('ionViewDidEnter Create');
    }

    ionViewWillLeave() {
        console.log('ionViewWillLeave Create');
    }

    ionViewDidLeave() {
        console.log('ionViewDidLeave Create');
    }


    ionViewCanLeave() {
        console.log('ionViewCanLeave Create');
    }




    /*
     getFollowers() {

     this.http.get(this.config.apiEndpoint + 'workouts/followers').map(res => res.json())
     .subscribe(data => {
     this.Followers = data.workouts;
     });
     }
     */

    getFollowers() {
        this.IsAjaxLoaded = true;
        this.storage.ready().then(() => {
            this.storage.get('token').then(token => {
                console.log(token);

                let headers = new Headers({'Authorization': 'Bearer ' + token});
                let options = new RequestOptions({ headers: headers });


                this.http.get(this.config.apiEndpoint + 'workouts/followers', options).map(res => res.json()).subscribe(data => {
                    this.IsAjaxLoaded = false;
                    this.Followers = data.workouts;
                }, err => {
                    console.log(err);
                })
            })
        })


    }


    toggleLike(workout) {
        console.log(workout.InLiked);
        if (workout.InLiked == null || workout.InLiked == undefined) {
            workout.InLiked = 1;
        } else {
            workout.InLiked = null;
        }
        this.IsAjaxLoaded = true;
        this.storage.ready().then(() => {
            this.storage.get('token').then(token => {
                console.log(token);
                //         let headers = new Headers();
                //            headers.append('Authorization', 'Bearer ' + token);
                let headers = new Headers({'Authorization': 'Bearer ' + token});
                let options = new RequestOptions({headers: headers});
                this.http.post(this.config.apiEndpoint + 'workout/likes', workout, options).map(res => res.json()) .subscribe(data => {

                    console.log(data);
                    this.IsAjaxLoaded = false;
                });
            })
        })
    }



    showDetails(selectedWorkout){
        this.navCtrl.push(WorkoutDetailsPage,{workout:selectedWorkout})
    }


}
