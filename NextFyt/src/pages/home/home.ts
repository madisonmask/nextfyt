import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SavedListPage} from '../savedlist/savedlist'
//import {CreatePage} from '../create/create'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    SavedListPage1 = SavedListPage;
   // CreatePage1=CreatePage;
  constructor(public navCtrl: NavController) {

  }

   goSaved(){

     console.log('go saved');
       this.navCtrl.push(this.SavedListPage1);
    }



}
