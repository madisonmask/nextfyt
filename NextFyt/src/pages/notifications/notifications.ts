import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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


  constructor(public navCtrl: NavController, public navParams: NavParams) {
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

}
