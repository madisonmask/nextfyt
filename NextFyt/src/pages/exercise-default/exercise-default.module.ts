import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExerciseDefaultPage } from './exercise-default';

@NgModule({
  declarations: [
    ExerciseDefaultPage,
  ],
  imports: [
    IonicPageModule.forChild(ExerciseDefaultPage),
  ],
  exports: [
    ExerciseDefaultPage
  ]
})
export class ExerciseDefaultPageModule {}
