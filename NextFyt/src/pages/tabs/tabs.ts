import { Component } from '@angular/core';
//import { AboutPage } from '../about/about';
//import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {SearchPage} from '../search/search'
import {CreatePage} from '../create/create'
import {NotificationsPage} from '../notifications/notifications'
import {ProfilePage} from '../profile/profile'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SearchPage;
  tab3Root = CreatePage;

  tab4Root = NotificationsPage;
  tab5Root = ProfilePage;

  constructor() {

  }
}
