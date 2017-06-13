import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExerciseHistoryPage } from './exercise-history';

@NgModule({
  declarations: [
    ExerciseHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ExerciseHistoryPage),
  ],
  exports: [
    ExerciseHistoryPage
  ]
})
export class ExerciseHistoryPageModule {}
