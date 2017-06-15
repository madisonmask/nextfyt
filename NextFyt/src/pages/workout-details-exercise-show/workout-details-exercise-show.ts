import { Component,Inject , ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, Slides  } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {Http, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';

import {APP_CONFIG, IAppConfig} from '../../app/app.config';




//https://codepen.io/rdelafuente/pen/lteGc



/**
 * Generated class for the WorkoutDetailsExerciseShowPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-workout-details-exercise-show',
  templateUrl: 'workout-details-exercise-show.html',
})
export class WorkoutDetailsExerciseShowPage {
  @ViewChild('mySlides') slider: Slides;
  Exercise={id:0, name:'', skill:'', repeat_count:0, repeat_type:'', length_count:'', length_type:'', equipment:[], stage1_img:''};

  IsAjaxLoaded: boolean = false;
  config: IAppConfig;
  showFullscreen=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,   public http: Http,
              @Inject(APP_CONFIG)  config: IAppConfig, private storage: Storage) {


    this.Exercise = this.navParams.get('exercise');
    this.config = config;
    this.getExerciseDetails();


  }







/*
  next(slide, index) {
    console.log(slide);
    console.log(slide.Slides );
    console.log(slide.slider);
    slide.Slides.slideTo(index, 2000)
  }


*/










  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkoutDetailsExerciseShowPage');
  }


  getExerciseDetails() {
    this.IsAjaxLoaded = true;
    this.storage.ready().then(() => {
      this.storage.get('token').then(token => {
        console.log(token);

        let headers = new Headers({'Authorization': 'Bearer ' + token});
        let options = new RequestOptions({headers: headers});


        this.http.get(this.config.apiEndpoint + 'exercise/' + this.Exercise.id, options).map(res => res.json()).subscribe(data => {
          this.IsAjaxLoaded = false;

          this.Exercise = data.exercises;

        }, err => {
          console.log(err);
        })
      })
    })

  }

  showRadio(number){


this.showFullscreen=true;
    console.log(this.slider);

console.log(number);

this.slider.slideTo(number,0)

 //   this.slider.slideTo(3,0);
  }




  slideClick(){
    console.log('click');
    this.showFullscreen=false;
  }

}












