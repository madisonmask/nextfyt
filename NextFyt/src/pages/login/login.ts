import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {RegistrationPage} from '../registration/registration';
import {PasswordResetPage} from '../password-reset/password-reset';
import {AuthService} from '../../services/auth';
import {UserService} from '../../services/User';
import {TabsService} from '../../services/tabs';
import{HomePage} from'../home/home';


import {JwtHelper} from "angular2-jwt";
import {Storage} from "@ionic/storage";


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    //  User = {};
    tabBarElement: any;
    jwtHelper = new JwtHelper();


    constructor(public navCtrl: NavController, public navParams: NavParams, public Auth: AuthService,
                private storage: Storage, public User: UserService, public tabsService: TabsService) {
        this.tabBarElement = document.querySelector('#tabs');

    }

    onPageWillEnter() {
        this.tabsService.hide();
    }

    onPageWillLeave() {
        this.tabsService.show();
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
        //    this.tabsService.hide();
    }

    doLogin() {
        this.Auth.doLogin(this.User).subscribe(data => {

                console.log(data);
                this.storage.set('token', data.token);

                /*         this.Auth.getProfile().then(user=>{
                 console.log(user);

                 })

                 */
                this.Auth.getProfile().then(data=> {
                    console.log(data);
                    if (data.id == 0) {
                        console.log('User not logined');
                        this.navCtrl.push(LoginPage);
                    } else {
                        this.User = data;
                        this.navCtrl.setRoot(HomePage);
                //        this.navCtrl.pop();


                    }
                })
                /*
                 this.Auth.getProfile().subscribe(data => {

                 this.User =data;

                 }, err => {
                 console.log(err);

                 })

                 */
                //       this.User = this.jwtHelper.decodeToken(data.token);
                //      console.log(this.User);
                //      this.storage.set('profile', this.User);

            },
            err=> {
                console.log('error');
                console.log(err);
            })

    }


    doRegister() {
        this.navCtrl.push(RegistrationPage);
    }

    doPasswordRecovery() {
        this.navCtrl.push(RegistrationPage);
    }


    doFB() {
        console.log('do FB');
        return false;
    }
}
