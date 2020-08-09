import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,NgForm,NgModel} from '@angular/forms';
import {HttpClientModule,HttpClient,HttpHeaders,HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {CommonModule} from '@angular/common';
import{NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SubHomeComponent } from './sub-home/sub-home.component';
import { RevgrowthComponent } from './revgrowth/revgrowth.component';
import { ErrorIntercept } from './error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SubHomeComponent,
    RevgrowthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    CommonModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
