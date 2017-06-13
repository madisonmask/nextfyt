import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthService} from '../../services/auth';
import{UserService} from  '../../services/User';
import {HomePage} from '../home/home';
import {LoginPage} from '../login/login';
import {Storage} from "@ionic/storage";


/**
 * Generated class for the RegistrationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-registration',
    templateUrl: 'registration.html',
})
export class RegistrationPage {

    User = {};

    constructor(public navCtrl: NavController, public navParams: NavParams, public Auth: AuthService, public user: UserService, private storage: Storage) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegistrationPage');
    }

    doRegister() {








        /*         this.Auth.getProfile().then(user=>{
         console.log(user);

         })

         */
        /*         this.Auth.getProfile().then(data=> {
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


         }

         */


        this.Auth.doRegister(this.User).subscribe(data => {

            this.storage.set('token', data.token);

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


            /*       if (data.error == false) {

             this.user=data.user;
             this.navCtrl.setRoot(HomePage);

             } else {
             console.log(data);

             }
             */

        }, error=> {
            console.log('error');
            console.log(error);

        })

    }


}
