import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RegistrationPage} from '../registration/registration';
/**
 * Generated class for the PasswordResetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-password-reset',
  templateUrl: 'password-reset.html',
})
export class PasswordResetPage {


  User={email:''};
  IsAjaxLoaded: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordResetPage');
  }

  goBack(){
    this.navCtrl.pop();
  }

  doRegister() {
    this.navCtrl.push(RegistrationPage);
  }





}
