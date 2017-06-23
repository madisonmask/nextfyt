import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController} from 'ionic-angular';
import {Storage} from "@ionic/storage";

import {Http, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';

import {APP_CONFIG, IAppConfig} from '../../app/app.config';
/**
 * Generated class for the Notifications page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {


  isMySaved = true;
  IsAjaxLoaded: boolean = false;
  Notifications=[];
  config:IAppConfig;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
              @Inject(APP_CONFIG)  config: IAppConfig, private storage: Storage
      , private toastCtrl: ToastController) {



    this.config = config;
    this.getNotification();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Notifications');
  }

  ShowNotify(type) {
    console.log(type);

    if (type == 'My') {
      this.isMySaved = true;
    } else {
      this.isMySaved = false;
    }

  }


  getNotification(){
    this.IsAjaxLoaded = true;
    this.storage.ready().then(() => {
      this.storage.get('token').then(token => {
        console.log(token);

        let headers = new Headers({'Authorization': 'Bearer ' + token});
        let options = new RequestOptions({headers: headers});


        this.http.get(this.config.apiEndpoint + 'news', options).map(res => res.json()).subscribe(data => {
          this.IsAjaxLoaded = false;

          this.Notifications = data.news;

        }, err => {
          console.log(err);
        })
      })
    })

  }

  ionViewWillEnter() {
   this.getNotification();
  }

}
