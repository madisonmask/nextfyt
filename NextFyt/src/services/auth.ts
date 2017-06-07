/**
 * Created by Vika on 07.06.2017.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';

import{UserService} from  './User';

@Injectable()
export class AuthService {
    data={};
    constructor( public http: Http, public  user:UserService) {
       this.http = http;
        this.data = null;

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
        this.http.get('http://nextfyt.local/api/profile').map(res => res.json())
            .subscribe(data => {
                this.data = data;
                console.log(data);
                this.user.setUser(data);
                return data;
            });
    }


}