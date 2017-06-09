import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShareWorkoutPage } from './share-workout';

@NgModule({
  declarations: [
    ShareWorkoutPage,
  ],
  imports: [
    IonicPageModule.forChild(ShareWorkoutPage),
  ],
  exports: [
    ShareWorkoutPage
  ]
})
export class ShareWorkoutPageModule {}
