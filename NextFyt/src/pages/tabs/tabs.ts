import { Component } from '@angular/core';
//import { AboutPage } from '../about/about';
//import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {SearchPage} from '../search/search'
import {CreatePage} from '../create/create'
import {NotificationsPage} from '../notifications/notifications'
import {ProfilePage} from '../profile/profile'

import {UserService} from '../../services/User'
import {AuthService} from '../../services/auth';
import {NavController} from 'ionic-angular';
//import {LoginPage} from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SearchPage;
  tab3Root = CreatePage;

  tab4Root = NotificationsPage;
  tab5Root = ProfilePage;

  constructor(public user: UserService, public  Auth: AuthService, public navCtrl: NavController) {

  }

/*
  ionViewWillEnter() {
    //   var CurUser: any;
    console.log('ionViewWillEnter Create');
    if (this.user.getData().id == 0) {
      console.log('We dont have user data');
      this.Auth.getProfile().then(data=> {
        console.log(data);
        if (data.id == 0) {
          console.log('User not logined');
          this.navCtrl.push(LoginPage);
        }
      })
    } else {
      console.log('User logined');
      return true;
    }
    console.log();
  }

*/

}
