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
import { MainConfigComponent } from './configuration/main-config/main-config.component';
import { HeaderConfigComponent } from './configuration/header-config/header-config.component';
import { PostNewsComponent } from './configuration/edit-news/post-news/post-news.component';
import { CKEditorModule} from '@ckeditor/ckeditor5-angular';
import { from } from 'rxjs';
@NgModule({
  declarations: [
    MainComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    NewsConfigComponent,
    HomeComponent,
    MainConfigComponent,
    HeaderConfigComponent,
    NewsConfigComponent,
    PostNewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StickyNavModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
