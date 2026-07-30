// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';
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
import { ElectricityComponent } from './shared/dashboard/electricity/electricity.component';
import { AddelectricityComponent } from './shared/dashboard/addelectricity/addelectricity.component';
import { EditelectricityComponent } from './shared/dashboard/editelectricity/editelectricity.component';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoaderComponent } from './shared/dashboard/loader/loader.component';
import {NgChartsModule} from 'ng2-charts';
import { LoginComponent } from './shared/dashboard/login/login.component';
import { HomeComponent } from './shared/dashboard/home/home.component';
import { RegisterComponent } from './shared/dashboard/register/register.component';
import { ProfileComponent } from './shared/dashboard/profile/profile.component';
import { MybillsComponent } from './shared/dashboard/mybills/mybills.component';
import { MakepaymentComponent } from './shared/dashboard/makepayment/makepayment.component';
import { HistoryComponent } from './shared/dashboard/history/history.component';
import { MyConactionComponent } from './shared/dashboard/my-conaction/my-conaction.component'
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DetailsComponent,
    NavBarComponent,
    ElectricityComponent,
    AddelectricityComponent,
    EditelectricityComponent,
    LoaderComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ProfileComponent,
    MybillsComponent,
    MakepaymentComponent,
    HistoryComponent,
    MyConactionComponent
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

    // AngularFireModule.initializeApp(environment.firebase),
// AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
