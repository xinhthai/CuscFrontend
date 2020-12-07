import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './layouts/main-layout/footer/footer.component';
import { HeaderComponent } from './layouts/main-layout/header/header.component';
import { NavbarComponent } from './layouts/main-layout/navbar/navbar.component';
import {StickyNavModule} from 'ng2-sticky-nav';
import { HttpClientModule} from '@angular/common/http';
import {MainComponent} from './main/main.component'
import { HomeComponent } from './home/home.component';
import { CommonModule} from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminHeaderComponent } from './layouts/admin-layout/admin-header/admin-header.component';
import { NewsInputComponent } from './data-management/news-management/news-input/news-input.component';
import { NewsTableComponent } from './data-management/news-management/news-table/news-table.component';
import { AccountComponent } from './data-management/account/account.component';
import { LoginComponent } from './data-management/account/login/login.component';
import { NewsCategoryComponent } from './data-management/news-management/news-category/news-category.component';
@NgModule({
  declarations: [
    MainComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    AdminHomeComponent,
    AdminHeaderComponent,
    NewsInputComponent,
    NewsTableComponent,
    AccountComponent,
    NewsCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    StickyNavModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
