import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the DefaultExercisesParamsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-default-exercises-params',
    templateUrl: 'default-exercises-params.html',
})
export class DefaultExercisesParamsPage {

    Exercise = {};

    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {

        this.Exercise = navParams.get('exercise');

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DefaultExercisesParamsPage');
    }


    ApplyFilter() {
        console.log('apply');


        console.log(this.Exercise);
        this.viewCtrl.dismiss(this.Exercise);
    }


}
