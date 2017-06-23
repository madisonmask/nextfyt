import {Component, Inject} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';

import {Storage} from "@ionic/storage";
import {Http, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';

import {APP_CONFIG, IAppConfig} from '../../app/app.config';
import {WorkoutDetailsPage} from '../workout-details/workout-details';


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

    activeTab = 'My';
    config: IAppConfig;

    createdList = [];

    favoritedList = [];

    keeperList = [];

    IsAjaxLoaded: boolean = false;

    ActiveList = this.createdList;


    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
                @Inject(APP_CONFIG)  config: IAppConfig, private storage: Storage, private toastCtrl: ToastController) {
        this.config = config;
        this.getMyWorkouts();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Savedlist');
    }

    ShowSaved(type) {
        console.log(type);

        this.activeTab = type;

        if (type == 'My') {
            this.getMyWorkouts();
            //         this.ActiveList = this.createdList;
        } else if (type == 'Favorited') {
            this.getFavoritesWorkouts();
            //         this.ActiveList = this.favoritedList;
        } else {

            this.getKeepersWorkouts();
            //      this.ActiveList = this.keeperList;
        }

    }

    itemSelected(item) {
        console.log(item);
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

    getKeepersWorkouts() {
        this.IsAjaxLoaded=true;
        this.storage.ready().then(() => {
            this.storage.get('token').then(token => {
                console.log(token);


                let headers = new Headers({'Authorization': 'Bearer ' + token});
                let options = new RequestOptions({headers: headers});


                this.http.get(this.config.apiEndpoint + 'workouts/myKeepers', options).map(res => res.json()).subscribe(data => {
                    this.IsAjaxLoaded=false;
                    this.keeperList = data.workouts;
                    console.log(data);
                    this.ActiveList = this.keeperList;


                }, error => {
                    this.IsAjaxLoaded=false;
                    console.log(error);
                    this.showToastr(error.json().error)
                })
            })
        })
    }

    showDetails(selectedWorkout) {
        this.navCtrl.push(WorkoutDetailsPage, {workout: selectedWorkout})
    }


    toggleKeepers(event, item) {

        event.stopPropagation();
        console.log(item);
        console.log(item.Inkeepers);
        if (item.Inkeepers == null) {
            item.Inkeepers = 1;
        } else {
            item.Inkeepers = null;
        }
        this.IsAjaxLoaded = true;
        this.storage.ready().then(() => {
            this.storage.get('token').then(token => {
                console.log(token);
                //         let headers = new Headers();
                //            headers.append('Authorization', 'Bearer ' + token);
                let headers = new Headers({'Authorization': 'Bearer ' + token});
                let options = new RequestOptions({headers: headers});
                this.http.post(this.config.apiEndpoint + 'workout/keepers', item, options).map(res => res.json()) .subscribe(data => {

                    console.log(data);
                   this.IsAjaxLoaded = false;
                });
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

}
