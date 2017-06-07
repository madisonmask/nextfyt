import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SavedListPage} from '../savedlist/savedlist'
//import {CreatePage} from '../create/create'
import {AuthService} from '../../services/auth';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

//    SavedListPage1 = SavedListPage;
   // CreatePage1=CreatePage;
  constructor(public navCtrl: NavController, data:AuthService) {
      data.getData();
      data.getProfile();
  }

   goSaved(){

     console.log('go saved');
       this.navCtrl.push(SavedListPage);
    }



}
