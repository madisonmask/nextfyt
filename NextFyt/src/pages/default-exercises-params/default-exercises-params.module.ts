import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DefaultExercisesParamsPage } from './default-exercises-params';

@NgModule({
  declarations: [
    DefaultExercisesParamsPage,
  ],
  imports: [
    IonicPageModule.forChild(DefaultExercisesParamsPage),
  ],
  exports: [
    DefaultExercisesParamsPage
  ]
})
export class DefaultExercisesParamsPageModule {}
