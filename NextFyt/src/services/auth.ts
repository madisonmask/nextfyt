/**
 * Created by Vika on 07.06.2017.
 */
import {Injectable, Inject} from "@angular/core";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';

import{UserService} from  './User';
import {APP_CONFIG, IAppConfig} from '../app/app.config';
import {JwtHelper} from "angular2-jwt";
import {Storage} from "@ionic/storage";
//import {HttpClient} from './HttpClient';

import {Observable} from 'rxjs/observable';


@Injectable()
export class AuthService {
    data = {};
    config: IAppConfig;
    // We need to set the content type for the server
    error: string;
    jwtHelper = new JwtHelper();
    token: string;

    constructor(public http: Http, private  user: UserService,
                @Inject(APP_CONFIG)  config: IAppConfig, private storage: Storage) {
        this.http = http;
        this.data = null;
        this.config = config;
        console.log(config.apiEndpoint);
        console.log(user);
        /*
         storage.ready().then(() => {
         storage.get('profile').then(profile => {
         console.log(profile);
         //        this.user = JSON.parse(profile);
         }).catch(console.log);
         });

         */

    }


    /*
     login(credentials) {
     this.http.post(this.LOGIN_URL, JSON.stringify(credentials), { headers: this.contentHeader })
     .map(res => res.json())
     .subscribe(
     data => this.authSuccess(data.id_token),
     err => this.error = err
     );
     }

     signup(credentials) {
     this.http.post(this.SIGNUP_URL, JSON.stringify(credentials), { headers: this.contentHeader })
     .map(res => res.json())
     .subscribe(
     data => this.authSuccess(data.id_token),
     err => this.error = err
     );
     }
     */
    logout() {
        this.storage.remove('token');
       // this.user = null;
    }


    retrieveData() {
       return true;
    }


    /**
     * Get currently logined profile
     * @returns {Promise<T>}
     */
    getProfile(): Promise<any> {
       return new Promise(resolve => {
            this.storage.ready().then(() => {
                this.storage.get('token').then(token => {
                    console.log(token);

                    let headers = new Headers();
                    headers.append('Authorization', 'Bearer ' + token);






                    this.http.get(this.config.apiEndpoint + 'profile',{
                        headers: headers
                    }).map(res => res.json()).subscribe(data => {
                        console.log(this.user);
                        console.log(data);
                        this.user.setUser(data.user);
                        resolve(data.user);
                    }, err => {
                        console.log(err);
                    })
                })
            })
        });
    }

    doLogin(user) {
        return this.http.post(this.config.apiEndpoint + 'login', user).map(res => res.json());
    }

    doRegister(user) {
        return this.http.post(this.config.apiEndpoint + 'register', user).map(res => res.json());
    }


}