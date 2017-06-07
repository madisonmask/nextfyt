/**
 * Created by Vika on 07.06.2017.
 */
//http://plnkr.co/edit/7A21ofKNdi0uvbMgLUDZ?p=preview
import {Injectable} from "@angular/core";


@Injectable()
export class UserService {
    user = {id: 0, avatar: '', email: '', username: '', posts: 0, followers: 0, following: 0};

    constructor() {

    }

    retrieveData() {
        /*        this.http.get('./mocks/test.json')
         .subscribe(data => {
         this.data = data;
         });*/
    }

    getData() {

        return this.user;
    }


    setUser(UserObj) {
        this.user.id = UserObj.id;
        this.user.avatar = UserObj.avatar;
        this.user.email = UserObj.email;
        this.user.username = UserObj.username;
        this.user.posts = UserObj.posts;
        this.user.followers = UserObj.followers;
        this.user.following = UserObj.following;
        console.log(this.user);
    }


}