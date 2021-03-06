import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {Http, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';

import {APP_CONFIG, IAppConfig} from '../../app/app.config';


/**
 * Generated class for the EditPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-password',
  templateUrl: 'edit-password.html',
})
export class EditPasswordPage {

  user:any;
  AvatarImage:string='';

  config: IAppConfig;
  IsAjaxLoaded: boolean = false;



  constructor(public navCtrl: NavController, public navParams: NavParams,   public alertCtrl:AlertController, private storage: Storage,  public http: Http,
              @Inject(APP_CONFIG)  config: IAppConfig) {


    this.user = this.navParams.get('user');
    console.log(this.user);
    this.config=config;


  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPasswordPage');
  }



  save(){

    this.IsAjaxLoaded = true;
    this.storage.ready().then(() => {
      this.storage.get('token').then(token => {
        console.log(token);

        let headers = new Headers({'Authorization': 'Bearer ' + token});
        let options = new RequestOptions({headers: headers});


        this.http.post(this.config.apiEndpoint + 'profile' , this.user, options).map(res => res.json()).subscribe(data => {
          this.IsAjaxLoaded = false;





        }, err => {
          console.log(err);
        })
      })
    })



  }



}
