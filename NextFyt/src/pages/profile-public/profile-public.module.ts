import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePublicPage } from './profile-public';

@NgModule({
  declarations: [
    ProfilePublicPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePublicPage),
  ],
  exports: [
    ProfilePublicPage
  ]
})
export class ProfilePublicPageModule {}
