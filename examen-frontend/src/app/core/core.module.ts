import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrowlModule } from 'primeng/components/growl/growl';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  imports: [
    CommonModule,
    GrowlModule
  ],
  declarations: [ NotificationComponent],
  exports:[ NotificationComponent ]
})
export class CoreModule { }
 