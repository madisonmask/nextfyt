import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {RegistrationPage} from '../registration/registration';
import {AuthService} from '../../services/auth';
import {UserService} from '../../services/User';
import {TabsPage} from '../tabs/tabs';


/**
 * Generated class for the AuthPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-auth',
    templateUrl: 'auth.html',
})
export class AuthPage {

    IsAjaxLoaded: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public Auth: AuthService, public User: UserService, private toastCtrl: ToastController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AuthPage');
    }

    ionViewWillEnter() {
        console.log('ionViewWillEnter Create');
        this.Auth.getProfile().then(data=> {
            this.IsAjaxLoaded = false;
            console.log(data);
            if (data.id == 0) {

            } else {
                this.User = data;
                this.navCtrl.setRoot(TabsPage);
                //        this.navCtrl.pop();
            }
        }, error=> {
            this.IsAjaxLoaded = false;
            this.showToastr(error.json().error)
        })
    }


    goRegister() {
        this.navCtrl.push(RegistrationPage);
    }

    goLogin() {
        this.navCtrl.push(LoginPage);
    }

    showToastr(msg) {
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
