import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import {StickyNavModule} from 'ng2-sticky-nav';
import { NewsConfigComponent } from './configuration/news-config/news-config.component';
import { HomeComponent } from './home/home.component';
@NgModule({
  declarations: [
    MainComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    NewsConfigComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StickyNavModule
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
