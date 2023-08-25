import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RecaptchaModule } from 'ng-recaptcha';
import { NgxCaptchaModule } from 'ngx-captcha';

import { ModalModule } from './_modal';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { KupacComponent } from './kupac/kupac.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PretragaComponent } from './pretraga/pretraga.component';
import { NekretninaComponent } from './nekretnina/nekretnina.component';
import { OglasivacComponent } from './oglasivac/oglasivac.component';
import { NovaNekretninaComponent } from './nova-nekretnina/nova-nekretnina.component';
import { AdminComponent } from './admin/admin.component';
import { NovaAgencijaComponent } from './nova-agencija/nova-agencija.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    KupacComponent,
    NavbarComponent,
    PretragaComponent,
    NekretninaComponent,
    OglasivacComponent,
    NovaNekretninaComponent,
    AdminComponent,
    NovaAgencijaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecaptchaModule,
    NgxCaptchaModule,
    BrowserAnimationsModule,
    ModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
