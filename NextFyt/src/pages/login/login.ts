import {Component} from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';
import {RegistrationPage} from '../registration/registration';
import {PasswordResetPage} from '../password-reset/password-reset';
import {AuthService} from '../../services/auth';
import {UserService} from '../../services/User';
import {TabsService} from '../../services/tabs';
import {TabsPage} from '../tabs/tabs';

//import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Facebook } from 'ionic-native';

import {JwtHelper} from "angular2-jwt";
import {Storage} from "@ionic/storage";


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    //  User = {};
    tabBarElement: any;
    jwtHelper = new JwtHelper();
    IsAjaxLoaded: boolean = false;

    FB_APP_ID: number = 1788817871428642;
    constructor(public navCtrl: NavController, public navParams: NavParams, public Auth: AuthService,
                private storage: Storage, public User: UserService, public tabsService: TabsService, private toastCtrl: ToastController
    ) {

      // Facebook.browserInit(this.FB_APP_ID, "v2.8");   #ENABLE ME ON MOBILE!!!!!
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

    doFBLogin(user) {
     //   alert('do login');
        this.IsAjaxLoaded=true;
        this.Auth.doFBLogin(user).subscribe(data => {

//alert(data);
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
        this.navCtrl.push(PasswordResetPage);
    }


    doFB() {

        Facebook.logout();
        console.log('do FB');
/*
        this.fb.login(['public_profile', 'user_friends', 'email'])
            .then((res: FacebookLoginResponse) => this.showToastr(res))
            .catch(e => this.showToastr(e));


    //    this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
   //     this.fb.logEvent(this.fb.EVENTS);
*/

        let permissions = new Array<string>();
//        let nav = this.navCtrl;
        //the permissions your facebook app needs from the user
        permissions = ['public_profile', 'user_friends', 'email'];

var Controller=this;

        Facebook.login(permissions)
            .then(function(response){
                let userId = response.authResponse.userID;
                let params = new Array<string>();

             //   this.showToastr(response);
                //Getting name and gender properties
                Facebook.api("/me?fields=name,gender,email", params)
                    .then(function(user) {
                        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
                        //now we have the users info, let's save it in the NativeStorage
                     console.log(user);
           //             alert(JSON.stringify(user));
                        Controller.doFBLogin(user);

            //            this.showToastr(user);

                        /*
                        {name:'first and last',
                        gender:'male/female',
                            id:111111,
                            picture:"img'"
                         }

                            */

                    })
            }, function(error){
                console.log(error);
     //           alert(error);
        //        this.showToastr(error);

            });


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


    goBack(){
        this.navCtrl.pop();
    }

}
