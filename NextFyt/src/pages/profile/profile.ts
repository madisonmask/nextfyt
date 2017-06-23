import {Component, Inject} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {UserService} from '../../services/User';
import {AuthService} from '../../services/auth';
import {LoginPage} from '../login/login';
import {ProfileSettingsPage} from '../profile-settings/profile-settings';
import {Storage} from "@ionic/storage";

import {Http, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';

import {APP_CONFIG, IAppConfig} from '../../app/app.config';
/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {

    user = {};

    config: IAppConfig;
    IsAjaxLoaded: boolean = false;

    createdList = [];

    favoritedList = [];
    ActiveList = this.createdList;
    profileWorkoutsType:string='workouts';


    constructor(public navCtrl: NavController, public navParams: NavParams, public userSrv: UserService, public Auth: AuthService
        , public http: Http,
                @Inject(APP_CONFIG)  config: IAppConfig, private storage: Storage
        , private toastCtrl: ToastController

    ) {

        this.config = config;

        //   this.user={id:1,username:'TestUser', avatar:'/assets/images/avatar.png', posts:8, followers:10, following:20};
        this.user = userSrv.getData();
        console.log(userSrv);
        console.log(userSrv.getData());
        this.getMyWorkouts();



    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Profile');
    }

    ionViewWillEnter() {
        this.user = this.userSrv.getData();
    }

    Logout() {
        this.Auth.logout();
        this.navCtrl.setRoot(LoginPage);
    }
    EditSettings(){
        this.navCtrl.push(ProfileSettingsPage, {user:this.user});
    }



    /**
     * @param {{workouts:Array}} data
     */
    getMyWorkouts() {
        this.IsAjaxLoaded=true;
        this.storage.ready().then(() => {
            this.storage.get('token').then(token => {
                console.log(token);


                let headers = new Headers({'Authorization': 'Bearer ' + token});
                let options = new RequestOptions({headers: headers});


                this.http.get(this.config.apiEndpoint + 'workouts/my', options).map(res => res.json()).subscribe(data => {
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


                this.http.get(this.config.apiEndpoint + 'workouts/myFavorites', options).map(res => res.json()).subscribe(data => {
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




    updateList(){
        console.log('update')

        console.log(this.profileWorkoutsType);
        if (this.profileWorkoutsType == 'workouts') {
            this.getMyWorkouts();
        } else if (this.profileWorkoutsType == 'favorites') {
            this.getFavoritesWorkouts();
        }

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
}
