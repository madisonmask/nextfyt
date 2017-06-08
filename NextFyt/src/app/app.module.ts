import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import {  SearchFilters } from '../pages/searchfilters/searchfilters';
import { CreatePage } from '../pages/create/create';
import { TabsPage } from '../pages/tabs/tabs';
import { NotificationsPage } from '../pages/notifications/notifications';
import { ProfilePage } from '../pages/profile/profile';
import { SavedListPage } from '../pages/savedlist/savedlist';
import { Registrations } from '../pages/registrations/registrations';

import { CreatedExercisesPage } from '../pages/createdexercises/createdexercises';
import {  CreatedExercisesStep2Page } from '../pages/createdexercisesstep2/createdexercisesstep2';
import { CreatedExercisesStagePage } from '../pages/createdexercisesstage/createdexercisesstage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera} from '@ionic-native/camera';
import { HttpModule } from '@angular/http';


import {AuthService} from '../services/auth';
import {UserService} from '../services/User';

import { APP_CONFIG, AppConfig } from './app.config';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SearchPage,
    CreatePage,
    NotificationsPage,
    ProfilePage,
    SavedListPage,
    Registrations,
    SearchFilters,
    CreatedExercisesPage,
    CreatedExercisesStep2Page,
    CreatedExercisesStagePage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SearchPage,
    CreatePage,
    NotificationsPage,
    ProfilePage,
    SavedListPage,
    Registrations,
    SearchFilters,
    CreatedExercisesPage,
    CreatedExercisesStep2Page,
    CreatedExercisesStagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    AuthService,
    UserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: APP_CONFIG, useValue: AppConfig }
  ]
})
export class AppModule {}
