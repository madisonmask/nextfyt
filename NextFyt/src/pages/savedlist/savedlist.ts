import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Savedlist page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-savedlist',
  templateUrl: 'savedlist.html',
})
export class SavedListPage {

  isMySaved =true;

  createdList=[{author:'USER', name:'training1', skill:'adv', muscles:'all', cardio:false, image:'http://via.placeholder.com/350x150'},
    {author:'USER', name:'training2', skill:'adv', muscles:'all', cardio:false, image:'http://via.placeholder.com/350x150'},
    {author:'USER', name:'training3', skill:'--', muscles:'not all', cardio:false, image:'http://via.placeholder.com/350x150'},
    {author:'USER', name:'training4', skill:'adv', muscles:'none', cardio:true, image:'http://via.placeholder.com/350x150'},
    ];

  favoritedList=[{author:'User1', name:'Lorem', skill:'adv', muscles:'all', cardio:false, image:'http://via.placeholder.com/350x150'},
    {author:'User2', name:'Chest', skill:'adv', muscles:'all', cardio:false, image:'http://via.placeholder.com/350x150'},
    {author:'user3', name:'Big Cardio', skill:'heart', muscles:'heart', cardio:true, image:'http://via.placeholder.com/350x150'}
  ];

  ActiveList = this.createdList;



  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Savedlist');
  }

  ShowSaved(type){
    console.log(type);

    if(type=='My'){
      this.isMySaved=true;
      this.ActiveList =this.createdList;
    }else{
      this.isMySaved=false;
      this.ActiveList =this.favoritedList;
    }

  }

  itemSelected(item){
    console.log(item);
  }

}
