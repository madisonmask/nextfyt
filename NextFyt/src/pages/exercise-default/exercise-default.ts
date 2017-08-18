import {Component, Inject} from '@angular/core';
import { NavController, NavParams, AlertController, ModalController} from 'ionic-angular';


import {Http, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';
import {Storage} from "@ionic/storage";

import {APP_CONFIG, IAppConfig} from '../../app/app.config';
import {DefaultExercisesParamsPage} from '../default-exercises-params/default-exercises-params';


/**
 * Generated class for the ExerciseDefaultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-exercise-default',
  templateUrl: 'exercise-default.html',
})
export class ExerciseDefaultPage {

  Exercises = [];
  SelectedExercise:any;
  config: IAppConfig;
  IsAjaxLoaded: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
              @Inject(APP_CONFIG)  config: IAppConfig, private storage: Storage, public alertCtrl: AlertController, public modalCtrl: ModalController) {
    this.config = config;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExerciseHistoryPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter Create');
    this.updateExerciseList();
  }

  updateExerciseList() {
    this.IsAjaxLoaded=true;
    this.storage.ready().then(() => {
      this.storage.get('token').then(token => {
        console.log(token);


        let headers = new Headers({'Authorization': 'Bearer ' + token});
        let options = new RequestOptions({ headers: headers });



        this.http.get(this.config.apiEndpoint + 'exercise/default', options).map(res => res.json()).subscribe(data => {
          this.Exercises = data.exercises;
          console.log(data);
          this.IsAjaxLoaded=false;

        }, err => {
          this.IsAjaxLoaded=false;
          console.log(err);
        })
      })
    })
  }

  selectItem(item){


    let contactModal = this.modalCtrl.create(DefaultExercisesParamsPage, {exercise:item});
    // Getting data from the modal:
    contactModal.onDidDismiss(data => {
      console.log('MODAL DATA', data);
      if (data != undefined) {

        this.SelectedExercise =item ;
        this.SelectedExercise.repeat_count= data.repeat_count;
        this.SelectedExercise.repeat_type= data.repeat_type;
        this.SelectedExercise.length_count= data.length_count;
        this.SelectedExercise.length_type= data.length_type;

this.addExercise(this.SelectedExercise);

      }


    });


    contactModal.present();



  }

















  addExercise(item) {
    this.storage.ready().then(() => {
      this.storage.get('token').then(token => {
        console.log(token);
        //         let headers = new Headers();
        //     headers.append('Authorization', 'Bearer ' + token);

        let headers = new Headers({'Authorization': 'Bearer ' + token});
        let options = new RequestOptions({headers: headers});
        console.log(item);
        let data = {exercise: item.id,

          repeat_count: item.repeat_count,
        repeat_type: item.repeat_type,
        length_count: item.length_count,
        length_type: item.length_type



        };
        console.log(data);
        this.http.post(this.config.apiEndpoint + 'exercise/selectDefault', data, options).map(res => res.json()).subscribe(data => {
          console.log(data);
          if (data.error == false) {
            this.navCtrl.pop();

          }
        }, err => {
          console.log(err);
        })
      })
    })
  }



  goBack(){
    this.navCtrl.pop();
  }



}
