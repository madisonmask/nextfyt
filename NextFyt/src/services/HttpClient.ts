//@todo  maybe use observer ?
 import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Storage} from "@ionic/storage";

@Injectable()
export class HttpClient {

    constructor(private http: Http, private storage: Storage) {}

    createAuthorizationHeader(headers: Headers) {
        return new Promise(resolve => {
            this.storage.ready().then(() => {
                this.storage.get('token').then(token => {
                    console.log(token);

                    headers.append('Authorization', 'Bearer ' + token);
                    resolve(token);
                })
            })
        })

    }

    get(url) {
        let headers = new Headers();
        console.log(headers);
        this.createAuthorizationHeader(headers).then(data=>{

            console.log(headers);
            return this.http.get(url, {
                headers: headers
            });

        })

    }

    post(url, data) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post(url, data, {
            headers: headers
        });
    }
}