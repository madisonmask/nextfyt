import {Component, Inject} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {UserService} from '../../services/User';

import {Http, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';

import {APP_CONFIG, IAppConfig} from '../../app/app.config';

import {WorkoutDetailsPage} from '../workout-details/workout-details';


/**
 * Generated class for the ProfilePublicPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-profile-public',
    templateUrl: 'profile-public.html',
})
export class ProfilePublicPage {

    user = {avatar: "", followers: 0, following: 0, id: 0, name: "", posts: 0};
    userLogined = {avatar: "", followers: 0, following: 0, id: 0, name: "", posts: 0};

    config: IAppConfig;
    IsAjaxLoaded: boolean = false;

    createdList = [];

    favoritedList = [];
    ActiveList = this.createdList;
    profileWorkoutsType: string = 'workouts';
    FollowedAlready= false; // do we already followed this user?


    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
                @Inject(APP_CONFIG)  config: IAppConfig, private storage: Storage, public userSrv: UserService,
                private toastCtrl: ToastController) {
        this.user = this.navParams.get('user');
        console.log(this.user);


        //      this.userLogined = userSrv.getData();

        this.config = config;
        this.getUserDetails();
        this.getWorkouts();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProfilePublicPage');
        this.checkIfFollowed();
    }


    getUserDetails() {


        this.IsAjaxLoaded = true;
        this.storage.ready().then(() => {
            this.storage.get('token').then(token => {
                console.log(token);

                let headers = new Headers({'Authorization': 'Bearer ' + token});
                let options = new RequestOptions({headers: headers});


                this.http.get(this.config.apiEndpoint + 'profile/' + this.user.id, options).map(res => res.json()).subscribe(data => {
                    //                this.IsAjaxLoaded = false;

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
                    this.FollowedAlready=true;
                    this.userSrv.increaseUserFollowing();
                }, err => {
                    console.log(err);
                })
            })
        })


    }


    unfollowUser() {

        this.IsAjaxLoaded = true;
        this.storage.ready().then(() => {
            this.storage.get('token').then(token => {
                console.log(token);

                let headers = new Headers({'Authorization': 'Bearer ' + token});
                let options = new RequestOptions({headers: headers});
                this.http.get(this.config.apiEndpoint + 'profile/unfollow/' + this.user.id, options).map(res => res.json()).subscribe(data => {
                    this.IsAjaxLoaded = false;
this.FollowedAlready=false;
                    this.userSrv.decreaseUserFollowing();
                }, err => {
                    console.log(err);
                })
            })
        })


    }


    checkIfFollowed() {
        //    this.IsAjaxLoaded=true;
        this.storage.ready().then(() => {
            this.storage.get('token').then(token => {
                console.log(token);


                let headers = new Headers({'Authorization': 'Bearer ' + token});
                let options = new RequestOptions({headers: headers});


                this.http.get(this.config.apiEndpoint + 'profile/checkfollow/' + this.user.id, options).map(res => res.json()).subscribe(data => {
                    console.log(data);

                    if(data.followed==true){
                        this.FollowedAlready =true;
                    };

                }, error => {
                    this.IsAjaxLoaded = false;
                    console.log(error);
                    this.showToastr(error.json().error)
                })
            })
        })
    };


    /**
     * @param {{workouts:Array}} data
     */
    getWorkouts() {
        this.IsAjaxLoaded = true;
        this.storage.ready().then(() => {
            this.storage.get('token').then(token => {
                console.log(token);


                let headers = new Headers({'Authorization': 'Bearer ' + token});
                let options = new RequestOptions({headers: headers});


                this.http.get(this.config.apiEndpoint + 'workouts/user/' + this.user.id, options).map(res => res.json()).subscribe(data => {
                    this.IsAjaxLoaded = false;
                    this.createdList = data.workouts;
                    console.log(data);
                    this.ActiveList = this.createdList;


                }, error => {
                    this.IsAjaxLoaded = false;
                    console.log(error);
                    this.showToastr(error.json().error)
                })
            })
        })
    }

    getFavoritesWorkouts() {
        this.IsAjaxLoaded = true;
        this.storage.ready().then(() => {
            this.storage.get('token').then(token => {
                console.log(token);


                let headers = new Headers({'Authorization': 'Bearer ' + token});
                let options = new RequestOptions({headers: headers});


                this.http.get(this.config.apiEndpoint + 'workouts/Favorites/' + this.user.id, options).map(res => res.json()).subscribe(data => {
                    this.IsAjaxLoaded = false;
                    this.favoritedList = data.workouts;
                    console.log(data);
                    this.ActiveList = this.favoritedList;


                }, error => {
                    this.IsAjaxLoaded = false;
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


    updateList() {
        console.log('update')

        console.log(this.profileWorkoutsType);
        if (this.profileWorkoutsType == 'workouts') {
            this.getWorkouts();
        } else if (this.profileWorkoutsType == 'favorites') {
            this.getFavoritesWorkouts();
        }

    }


    showDetails(selectedWorkout) {
        this.navCtrl.push(WorkoutDetailsPage, {workout: selectedWorkout})
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

    goBack() {
        this.navCtrl.pop();
    }


}
