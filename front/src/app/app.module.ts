import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from './app-routing.module';
import {DataComponent} from './components/data/data.component';
import {MainComponent} from "./components/main/main.component";
import {AppComponent} from "./app.component";
import {ButtonModule} from 'primeng/button';
import {RadioButtonModule} from "primeng/radiobutton";
import {RequestInterceptor} from "./request.interceptor";
import {TableModule} from "primeng/table";
import {TabViewModule} from "primeng/tabview";
import {RouterModule} from '@angular/router';
import {CheckboxModule} from "primeng/checkbox";


@NgModule({
  declarations: [
    AppComponent,
    DataComponent,
    MainComponent
  ],
    imports: [
        RouterModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        ButtonModule,
        ReactiveFormsModule,
        FormsModule,
        RadioButtonModule,
        TableModule,
        TabViewModule,
        CheckboxModule
    ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
