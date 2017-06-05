import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Passwordreset } from './passwordreset';

@NgModule({
  declarations: [
    Passwordreset,
  ],
  imports: [
    IonicPageModule.forChild(Passwordreset),
  ],
  exports: [
    Passwordreset
  ]
})
export class PasswordresetModule {}
