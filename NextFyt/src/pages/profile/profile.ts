import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  user={};
  profileWorkoutsType='';

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.user={id:1,username:'TestUser', avatar:'/assets/images/avatar.png', posts:8, followers:10, following:20};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile');
  }

}
