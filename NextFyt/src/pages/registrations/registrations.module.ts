import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Registrations } from './registrations';

@NgModule({
  declarations: [
    Registrations,
  ],
  imports: [
    IonicPageModule.forChild(Registrations),
  ],
  exports: [
    Registrations
  ]
})
export class RegistrationsModule {}
