import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { AdminComponent } from './admin/admin.component';
import { SharedModule } from '../shared';



@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  declarations: [AdminUserComponent, RegisterUserComponent, AdminComponent]
})
export class AdminModule { }
