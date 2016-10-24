import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { YoloComponent } from './yolo/yolo.component';
@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent,
    YoloComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
