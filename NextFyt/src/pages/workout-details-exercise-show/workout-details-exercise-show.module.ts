import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkoutDetailsExerciseShowPage } from './workout-details-exercise-show';

@NgModule({
  declarations: [
    WorkoutDetailsExerciseShowPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkoutDetailsExerciseShowPage),
  ],
  exports: [
    WorkoutDetailsExerciseShowPage
  ]
})
export class WorkoutDetailsExerciseShowPageModule {}
