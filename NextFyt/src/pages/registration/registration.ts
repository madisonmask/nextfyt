import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
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

    User = {Name:'', Email:'',Password:'',Role:'user', Accept:false};
    IsAjaxLoaded: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public Auth: AuthService, public user: UserService, private storage: Storage
        , private toastCtrl: ToastController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegistrationPage');
    }

    doRegister() {
        if(this.User.Accept==false){
            this.showToastr('You must accept agrements')
            return false;
        }



        this.IsAjaxLoaded=true;
        this.Auth.doRegister(this.User).subscribe(data => {

            if (data.error == false) {

                this.storage.set('token', data.token);
                console.log('do register finish');
                this.Auth.getProfile().then(data=> {
                    this.IsAjaxLoaded=false;
                    console.log(data);
                    if (data.id == 0) {
                        console.log('User not logined');
                        this.navCtrl.push(LoginPage);
                    } else {
                        this.User = data;
                        this.navCtrl.setRoot(HomePage);
                        //        this.navCtrl.pop();


                    }
                }, error=>{
                    this.IsAjaxLoaded=false;

                })

            }else{
                this.IsAjaxLoaded=false;
                this.showToastr(data.msg)

            }







            /*       if (data.error == false) {

             this.user=data.user;
             this.navCtrl.setRoot(HomePage);

             } else {
             console.log(data);

             }
             */

        }, error=> {
   //         console.log('error');
            console.log(error);
            this.showToastr(error.json().error)
        })

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

    goBack(){
        this.navCtrl.pop();
    }

}
