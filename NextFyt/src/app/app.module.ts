import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, Slides } from 'ionic-angular';
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
import { ProfilePublicPage } from '../pages/profile-public/profile-public';
import {ProfileSettingsPage} from '../pages/profile-settings/profile-settings';
import { SavedListPage } from '../pages/savedlist/savedlist';
import { RegistrationPage } from '../pages/registration/registration';
import { LoginPage } from '../pages/login/login';
import { ShareWorkoutPage } from '../pages/share-workout/share-workout';
import {WorkoutDetailsPage } from '../pages/workout-details/workout-details'
import {WorkoutDetailsExercisesPage } from '../pages/workout-details-exercises/workout-details-exercises'
import {WorkoutDetailsExerciseShowPage } from '../pages/workout-details-exercise-show/workout-details-exercise-show'


import { CreatedExercisesPage } from '../pages/createdexercises/createdexercises';
import {  CreatedExercisesStep2Page } from '../pages/createdexercisesstep2/createdexercisesstep2';
import { CreatedExercisesStagePage } from '../pages/createdexercisesstage/createdexercisesstage';

import {ExerciseDefaultPage} from '../pages/exercise-default/exercise-default';
import {ExerciseHistoryPage} from '../pages/exercise-history/exercise-history';

import {PrivacyPage} from '../pages/privacy/privacy';
import {TermsPage} from  '../pages/terms/terms';
import {EditPasswordPage} from  '../pages/edit-password/edit-password';
import {AuthPage} from  '../pages/auth/auth';
import {DefaultExercisesParamsPage} from '../pages/default-exercises-params/default-exercises-params';

import {PasswordResetPage} from '../pages/password-reset/password-reset';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera} from '@ionic-native/camera';
import { HttpModule } from '@angular/http';


import {AuthService} from '../services/auth';
import {UserService} from '../services/User';
import { TabsService } from '../services/tabs';
import { HttpClient } from '../services/HttpClient';

import {IonicStorageModule} from "@ionic/storage";
import { APP_CONFIG, AppConfig } from './app.config';

//import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';


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
    RegistrationPage,
    LoginPage,
    SearchFilters,
    CreatedExercisesPage,
    CreatedExercisesStep2Page,
    CreatedExercisesStagePage,
    ExerciseDefaultPage,
    ExerciseHistoryPage,
    ShareWorkoutPage,
    WorkoutDetailsPage,
    WorkoutDetailsExercisesPage,
    WorkoutDetailsExerciseShowPage,
    ProfilePublicPage,
    ProfileSettingsPage,
    PrivacyPage,
    TermsPage,
    EditPasswordPage,
    AuthPage,
    DefaultExercisesParamsPage,
    PasswordResetPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
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
    RegistrationPage,
    LoginPage,
    SearchFilters,
    CreatedExercisesPage,
    CreatedExercisesStep2Page,
    CreatedExercisesStagePage,
    ExerciseDefaultPage,
    ExerciseHistoryPage,
    ShareWorkoutPage,
    WorkoutDetailsPage,
    WorkoutDetailsExercisesPage,
    WorkoutDetailsExerciseShowPage,
    ProfilePublicPage,
    ProfileSettingsPage,
    PrivacyPage,
    TermsPage,
    AuthPage,
    DefaultExercisesParamsPage,
    PasswordResetPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    AuthService,
    UserService,
    TabsService,
    HttpClient,
     Slides,
  //  Facebook,
 //  IonicStorageModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: APP_CONFIG, useValue: AppConfig }
  ]
})
export class AppModule {}
