import {Component, Inject} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Storage} from "@ionic/storage";

import {Http, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';

import {APP_CONFIG, IAppConfig} from '../../app/app.config';

/**
 * Generated class for the ProfilePublicPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-profile-public',
    templateUrl: 'profile-public.html',
})
export class ProfilePublicPage {

    user = {avatar: "", followers: 0, following: 0, id: 0, name: "", posts: 0};


    config: IAppConfig;
    IsAjaxLoaded: boolean = false;

    createdList = [];

    favoritedList = [];
    ActiveList = this.createdList;
    profileWorkoutsType:string='workouts';


    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
                @Inject(APP_CONFIG)  config: IAppConfig, private storage: Storage
        , private toastCtrl: ToastController
    ) {
        this.user = this.navParams.get('user');
        console.log(this.user);

        this.config = config;
        this.getUserDetails();
        this.getWorkouts();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProfilePublicPage');
    }


    getUserDetails() {


        this.IsAjaxLoaded = true;
        this.storage.ready().then(() => {
            this.storage.get('token').then(token => {
                console.log(token);

                let headers = new Headers({'Authorization': 'Bearer ' + token});
                let options = new RequestOptions({headers: headers});


                this.http.get(this.config.apiEndpoint + 'profile/' + this.user.id, options).map(res => res.json()).subscribe(data => {
                    this.IsAjaxLoaded = false;

                    this.user = data.user;

                }, err => {
                    console.log(err);
                })
            })
        })


    }


    followUser() {

        this.IsAjaxLoaded = true;
        this.storage.ready().then(() => {
            this.storage.get('token').then(token => {
                console.log(token);

                let headers = new Headers({'Authorization': 'Bearer ' + token});
                let options = new RequestOptions({headers: headers});
                this.http.get(this.config.apiEndpoint + 'profile/follow/' + this.user.id, options).map(res => res.json()).subscribe(data => {
                    this.IsAjaxLoaded = false;

                }, err => {
                    console.log(err);
                })
            })
        })


    }





    /**
     * @param {{workouts:Array}} data
     */
    getWorkouts() {
        this.IsAjaxLoaded=true;
        this.storage.ready().then(() => {
            this.storage.get('token').then(token => {
                console.log(token);


                let headers = new Headers({'Authorization': 'Bearer ' + token});
                let options = new RequestOptions({headers: headers});


                this.http.get(this.config.apiEndpoint + 'workouts/user/'+this.user.id, options).map(res => res.json()).subscribe(data => {
                    this.IsAjaxLoaded=false;
                    this.createdList = data.workouts;
                    console.log(data);
                    this.ActiveList = this.createdList;


                }, error => {
                    this.IsAjaxLoaded=false;
                    console.log(error);
                    this.showToastr(error.json().error)
                })
            })
        })
    }

    getFavoritesWorkouts() {
        this.IsAjaxLoaded=true;
        this.storage.ready().then(() => {
            this.storage.get('token').then(token => {
                console.log(token);


                let headers = new Headers({'Authorization': 'Bearer ' + token});
                let options = new RequestOptions({headers: headers});


                this.http.get(this.config.apiEndpoint + 'workouts/Favorites/'+this.user.id, options).map(res => res.json()).subscribe(data => {
                    this.IsAjaxLoaded=false;
                    this.favoritedList = data.workouts;
                    console.log(data);
                    this.ActiveList = this.favoritedList;


                }, error => {
                    this.IsAjaxLoaded=false;
                    console.log(error);
                    this.showToastr(error.json().error)
                })
            })
        })
    }




    showToastr(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'middle'
        });
        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });
        toast.present();
    }


    updateList(){
        console.log('update')

        console.log(this.profileWorkoutsType);
        if (this.profileWorkoutsType == 'workouts') {
            this.getWorkouts();
        } else if (this.profileWorkoutsType == 'favorites') {
            this.getFavoritesWorkouts();
        }

    }
}
