import { Component, Inject } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {DomSanitizer} from '@angular/platform-browser';
import {Http, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';

import {APP_CONFIG, IAppConfig} from '../../app/app.config';
import { Camera } from '@ionic-native/camera';


import {PrivacyPage} from '../privacy/privacy';

import {TermsPage} from '../terms/terms';
import {EditPasswordPage} from '../edit-password/edit-password';
/**
 * Generated class for the ProfileSettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile-settings',
  templateUrl: 'profile-settings.html',
})
export class ProfileSettingsPage {

  user:any;
  AvatarImage:string='';

  config: IAppConfig;
  IsAjaxLoaded: boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams,  private camera:Camera, public alertCtrl:AlertController, private storage: Storage,  public http: Http,
              @Inject(APP_CONFIG)  config: IAppConfig, public _DomSanitizationService:DomSanitizer) {
    this.user = this.navParams.get('user');
    console.log(this.user);
    this.config=config;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileSettingsPage');
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






  takePicture() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.AvatarImage = "data:image/jpeg;base64," + imageData;
      this.user.ImageData = imageData;
    }, (err) => {
      console.log(err);
    });
  }


  selectFromGalery() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.AvatarImage = "data:image/jpeg;base64," + imageData;
      this.user.ImageData = imageData;
    }, (err) => {
      console.log(err);
    });
  }


  showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Lightsaber color');
    alert.addInput({
      type: 'radio',
      label: 'Take a Photo',
      value: 'camera',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Select from galery',
      value: 'galery',
      checked: false
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        console.log('Radio data:', data);
      //  this.testRadioOpen = false;

        if (data == 'camera') {
          this.takePicture();
        } else {
          this.selectFromGalery();
        }

      }
    });
    alert.present().then(() => {
   //   this.testRadioOpen = true;
    });


  }

  openPage(page){
    if(page=='privacy'){

      this.navCtrl.push(PrivacyPage);

    }else if (page=='terms'){

      this.navCtrl.push(TermsPage);
    }else if(page=='changePassword'){

      this.navCtrl.push(EditPasswordPage,{user:this.user});
    }


  }

  goBack(){
    this.navCtrl.pop();
  }


}
