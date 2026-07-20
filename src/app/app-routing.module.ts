import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './shared/dashboard/dashboard/dashboard.component';
import { DetailsComponent } from './shared/dashboard/details/details.component';
import { AddelectricityComponent } from './shared/dashboard/addelectricity/addelectricity.component';
import { EditelectricityComponent } from './shared/dashboard/editelectricity/editelectricity.component';
import { LoginComponent } from './shared/dashboard/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { HomeComponent } from './shared/dashboard/home/home.component';
import { RegisterComponent } from './shared/dashboard/register/register.component';
import { ProfileComponent } from './shared/dashboard/profile/profile.component';


const routes: Routes = [

 
   {
    path: '',
    component: HomeComponent
  },

  {
    path:'login',
    component:LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate:[AuthGuard]
  },

  {
    path:'details/:id',
    component:DetailsComponent,
    canActivate:[AuthGuard]
  },

  {
    path:'add',
    component:AddelectricityComponent,
    canActivate:[AuthGuard]
  },

  {
  path:'profile',
  component:ProfileComponent,
  canActivate:[AuthGuard]
},

  {
    path:'edit/:id',
    component:EditelectricityComponent,
    canActivate:[AuthGuard]
  },

  {
    path:'**',
    redirectTo:'login'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}