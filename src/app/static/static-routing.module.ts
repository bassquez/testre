import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { FeaturesComponent } from './features/features.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [

  { path: 'about', component: AboutComponent, data: { title: 'About' } },
  {
    path: 'features',
    component: FeaturesComponent,
    data: { title: 'Features' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticRoutingModule { }
