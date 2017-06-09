import {Component} from '@angular/core';
import {ModalController, NavController  } from 'ionic-angular';
import {SearchFilters} from '../searchfilters/searchfilters'

/**
 * Generated class for the Search page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-search',
    templateUrl: 'search.html',
})
export class SearchPage {
    Searched = {
        SearchString: '',
        Filters: {enabled: false, Muscles: [], Cardio: false, Difficulty: [], Equipment: [], TimeLength: ''}
    };
    shouldShowCancel = true;
    FilterValues = {Muscles: {}, Cardio: false, Difficulty: {}, Equipment: {}};


    onInput(event) {
        console.log('on input');
        console.log(event);

    }

    onCancel(event) {
        console.log('on input');
        console.log(event);

    }


    showOptions() {
        console.log('options');

        let contactModal = this.modalCtrl.create(SearchFilters);
        // Getting data from the modal:
        contactModal.onDidDismiss(data => {
            console.log('MODAL DATA', data);
        });


        contactModal.present();

    }


    constructor(public navCtrl:NavController, public modalCtrl:ModalController) {


    }


}

