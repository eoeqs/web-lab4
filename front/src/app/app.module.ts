import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { HeaderComponent } from './login/header/header.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { LoginPageComponent } from './login/login.component';
import { MainPageComponent } from './main/main.component';
import { ResultsComponent } from './main/results/results.component';
import { GraphComponent } from './main/graph/graph.component';
import { CoordinatesFormComponent } from './main/coordinates-form/coordinates-form.component';
import { LogoutComponent } from './main/logout/logout.component';

@NgModule({
  imports:      [ BrowserModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, AppRoutingModule ],
  declarations: [ AppComponent, HeaderComponent, LoginFormComponent, LoginPageComponent, MainPageComponent, ResultsComponent, GraphComponent, CoordinatesFormComponent, LogoutComponent],
  bootstrap:    [ AppComponent ],
  providers: [GraphComponent]
})
export class AppModule { }
