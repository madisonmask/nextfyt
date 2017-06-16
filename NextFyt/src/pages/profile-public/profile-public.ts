import {Component, Inject} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
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

    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
                @Inject(APP_CONFIG)  config: IAppConfig, private storage: Storage) {
        this.user = this.navParams.get('user');
        console.log(this.user);

        this.config = config;
        this.getUserDetails();
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


}
