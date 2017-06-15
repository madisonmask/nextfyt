import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkoutDetailsExercisesPage } from './workout-details-exercises';

@NgModule({
  declarations: [
    WorkoutDetailsExercisesPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkoutDetailsExercisesPage),
  ],
  exports: [
    WorkoutDetailsExercisesPage
  ]
})
export class WorkoutDetailsExercisesPageModule {}
