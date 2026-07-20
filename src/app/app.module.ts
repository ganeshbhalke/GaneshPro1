import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './shared/dashboard/dashboard/dashboard.component';
import { DetailsComponent } from './shared/dashboard/details/details.component';
import { NavBarComponent } from './shared/dashboard/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/dashboard/footer/footer.component';
import { ElectricityComponent } from './shared/dashboard/electricity/electricity.component';
import { AddelectricityComponent } from './shared/dashboard/addelectricity/addelectricity.component';
import { EditelectricityComponent } from './shared/dashboard/editelectricity/editelectricity.component';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoaderComponent } from './shared/dashboard/loader/loader.component';
import {NgChartsModule} from 'ng2-charts';
import { LoginComponent } from './shared/dashboard/login/login.component';
import { AuthComponent } from './shared/dashboard/auth/auth.component';
import { HomeComponent } from './shared/dashboard/home/home.component';
import { RegisterComponent } from './shared/dashboard/register/register.component';
import { ProfileComponent } from './shared/dashboard/profile/profile.component'
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DetailsComponent,
    NavBarComponent,
    FooterComponent,
    ElectricityComponent,
    AddelectricityComponent,
    EditelectricityComponent,
    LoaderComponent,
    LoginComponent,
    AuthComponent,
    HomeComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule,
    AppRoutingModule,

    AngularFireModule.initializeApp(environment.firebase),
AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
