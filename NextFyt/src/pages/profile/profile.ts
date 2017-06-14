import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserService} from '../../services/User';
import {AuthService} from '../../services/auth';
import {LoginPage} from '../login/login';
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

    user = {};
    profileWorkoutsType = '';

    constructor(public navCtrl: NavController, public navParams: NavParams, public userSrv: UserService, public Auth: AuthService) {

        //   this.user={id:1,username:'TestUser', avatar:'/assets/images/avatar.png', posts:8, followers:10, following:20};
        this.user = userSrv.getData();
        console.log(userSrv);
        console.log(userSrv.getData());

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Profile');
    }

    ionViewWillEnter() {
        this.user = this.userSrv.getData();
    }

    Logout() {
        this.Auth.logout();
        this.navCtrl.setRoot(LoginPage);
    }

}
