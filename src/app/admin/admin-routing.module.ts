import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { RegisterUserComponent } from './register-user/register-user.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    {
      path: '',
      redirectTo: 'admin-user',
      pathMatch: 'full'
    },
    {
      path: 'admin-user',
      component: AdminUserComponent,
      data: {
        title: 'Administrar Usuarios'
      }
    },
    {
      path: 'register-user',
      component: RegisterUserComponent,
      data: {
        title: 'Registrar Usuario'
      }
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
