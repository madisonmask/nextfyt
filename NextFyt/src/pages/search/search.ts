import {Component, Inject} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {SearchFilters} from '../searchfilters/searchfilters'
import {Storage} from "@ionic/storage";

import {Http, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';

import {APP_CONFIG, IAppConfig} from '../../app/app.config';
import{UserService} from '../../services/User';
import {ProfilePublicPage} from '../profile-public/profile-public';
import {WorkoutDetailsPage} from '../workout-details/workout-details';

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
    Searched = {
        Type: 'workouts',
        SearchString: '',
        Filters: {enabled: false, Muscles: [], Cardio: false, Difficulty: [], Equipment: [], TimeLength: ''}
    };
    shouldShowCancel = true;
    FilterValues = {Muscles: {}, Cardio: false, Difficulty: {}, Equipment: {}};
    IsAjaxLoaded: boolean = false;
    config: IAppConfig;
    WorkoutResults = [];
    UserResults = [];
    TagsResults = [];
    TopResults = [];
    //  SerachResultTabs = 'workouts';


    constructor(public navCtrl: NavController, public modalCtrl: ModalController, private storage: Storage,
                @Inject(APP_CONFIG)  config: IAppConfig, private  user: UserService, public http: Http) {

        this.config = config;
    }


    onInput(event) {
        console.log('on input');
        //   console.log(event);
        //   console.log(this.Searched);

        this.doSearch();


    }

    /**
     * @param {{results:Array}} data
     */
    doSearch() {
        this.IsAjaxLoaded = true;
        this.storage.ready().then(() => {
            this.storage.get('token').then(token => {
                console.log(token);
                //         let headers = new Headers();
                //            headers.append('Authorization', 'Bearer ' + token);
                let headers = new Headers({'Authorization': 'Bearer ' + token});
                let options = new RequestOptions({headers: headers});
                this.http.post(this.config.apiEndpoint + 'search', this.Searched, options).map(res => res.json()) .subscribe(data => {

                    console.log(data);
                    this.IsAjaxLoaded = false;

                    if (this.Searched.Type == 'workouts') {
                        this.WorkoutResults = data.results;

                    } else if (this.Searched.Type == 'people') {


                        this.UserResults = data.results;
                    } else if (this.Searched.Type == 'tags') {


                        this.TagsResults = data.results;
                    }

                });


            })
        })


    }

    itemSelected() {

    }

    showDetails(selectedWorkout) {
        this.navCtrl.push(WorkoutDetailsPage, {workout: selectedWorkout})
    }


    userSelected(user) {

        this.navCtrl.push(ProfilePublicPage, {user: user});
    }


    onCancel(event) {
        console.log('on input');
        console.log(event);

    }


    showOptions() {
        console.log('options');

        let contactModal = this.modalCtrl.create(SearchFilters);
        // Getting data from the modal:
        contactModal.onDidDismiss(data => {
            console.log('MODAL DATA', data);
            if (data != undefined) {
                this.Searched.Filters = data.Filters;
                this.doSearch();
            }


        });


        contactModal.present();

    }


    toggleLike(workout) {

        console.log(workout.liked);
        if (workout.liked == null) {
            workout.liked = 1;
        } else {
            workout.liked = null;
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


    showTag(tag){

this.Searched.Type='workouts';
        this.Searched.SearchString='#'+tag;
        this.doSearch();


    }



}

