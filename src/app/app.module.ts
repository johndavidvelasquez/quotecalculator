import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { GetquoteComponent } from './components/getquote/getquote.component';
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { MessagesModule } from 'primeng/messages';
import { NgxSliderModule } from 'ngx-slider-v2';
import { ReviewquoteComponent } from './components/reviewquote/reviewquote.component';
import { SuccessComponent } from './components/success/success.component';

interface Title {
  name: string;
}

@NgModule({
  declarations: [
    AppComponent,
    GetquoteComponent,
    ReviewquoteComponent,
    SuccessComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    DividerModule,
    MessagesModule,
    NgxSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
