import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './layouts/main-layout/footer/footer.component';
import { HeaderComponent } from './layouts/main-layout/header/header.component';
import { NavbarComponent } from './layouts/main-layout/navbar/navbar.component';
import {StickyNavModule} from 'ng2-sticky-nav';

import {MainComponent} from './main/main.component'
import { HomeComponent } from './home/home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminHeaderComponent } from './layouts/admin-layout/admin-header/admin-header.component';
import { NewsInputComponent } from './data-management/news-input/news-input.component';
import { NewsTableComponent } from './data-management/news-table/news-table.component';
@NgModule({
  declarations: [
    MainComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    HomeComponent,
    AdminHomeComponent,
    AdminHeaderComponent,
    NewsInputComponent,
    NewsTableComponent
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
