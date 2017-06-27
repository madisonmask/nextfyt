import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {RegistrationPage} from '../registration/registration';
import {PasswordResetPage} from '../password-reset/password-reset';
import {AuthService} from '../../services/auth';
import {UserService} from '../../services/User';
import {TabsService} from '../../services/tabs';
import{HomePage} from'../home/home';
import {TabsPage} from '../tabs/tabs';


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
    IsAjaxLoaded: boolean = false;


    constructor(public navCtrl: NavController, public navParams: NavParams, public Auth: AuthService,
                private storage: Storage, public User: UserService, public tabsService: TabsService, private toastCtrl: ToastController) {
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
        this.IsAjaxLoaded=true;
        this.Auth.doLogin(this.User).subscribe(data => {


                console.log(data);
                this.storage.set('token', data.token);

                /*         this.Auth.getProfile().then(user=>{
                 console.log(user);

                 })

                 */
                this.Auth.getProfile().then(data=> {

                    this.IsAjaxLoaded=false;


                    console.log(data);
                    if (data.id == 0) {
                        console.log('User not logined');
                        this.navCtrl.push(LoginPage);
                    } else {
                        this.User = data;
                        this.navCtrl.setRoot(TabsPage);
                //        this.navCtrl.pop();


                    }
                }, error=>{
                    this.IsAjaxLoaded=false;
                    this.showToastr(error.json().error)


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
            error=> {
                this.IsAjaxLoaded=false;
       //         console.log('error');
                console.log(error);
       //         console.log(err.text());
      //          console.log(err.json());
                this.showToastr(error.json().error)
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

    showToastr (msg){
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'middle'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }


}
