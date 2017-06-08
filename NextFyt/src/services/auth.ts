/**
 * Created by Vika on 07.06.2017.
 */
import {Injectable, Inject} from "@angular/core";
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';

import{UserService} from  './User';

import { APP_CONFIG, IAppConfig } from '../app/app.config';


@Injectable()
export class AuthService {
    data={};
    config: IAppConfig;
    constructor(public http: Http, public  user:UserService,
    @Inject(APP_CONFIG)  config: IAppConfig) {
       this.http = http;
        this.data = null;
       this.config=config;
       console.log(config.apiEndpoint);
    }

    retrieveData() {
/*        this.http.get('./mocks/test.json')
            .subscribe(data => {
                this.data = data;
            });*/
    }

    getData() {
        console.log('get data');
        return this.data;
    }


    getProfile(){
        this.http.get(this.config.apiEndpoint+'profile').map(res => res.json())
            .subscribe(data => {
                this.data = data;
                console.log(data);
                this.user.setUser(data);
                return data;
            });
    }


}