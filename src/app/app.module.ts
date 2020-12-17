import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
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
import { NewsTableComponent } from './data-management/news-management/news-table/news-table.component';
import { AccountComponent } from './data-management/account/account.component';
import { LoginComponent } from './data-management/account/login/login.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NewsCategoryComponent } from './data-management/news-management/news-category/news-category.component';
import {  DialogComponent, NewsInputComponent } from './data-management/news-management/news-input/news-input.component';
import { NewsDetailComponent } from './data-management/news-management/news-detail/news-detail.component';
import { MainPageComponent } from './data-management/news-management/main-page/main-page.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {MatSliderModule} from '@angular/material/slider';
import { MatSelectModule} from '@angular/material/select';
import { DemoMaterialModule } from './main/material.module';
import { NgxPaginationModule} from 'ngx-pagination';
import { ChoiceDialogComponent } from './shared/choice-dialog/choice-dialog.component';
import { NotificationDialogComponent } from './shared/notification-dialog/notification-dialog.component';
import { ErrorComponent } from './data-management/error/error.component';
import { DialogAddComponent } from './data-management/news-management/news-category/dialog-add/dialog-add.component';
import { RegisterComponent } from './data-management/account/register/register.component';
import { DialogUpdateComponent } from './data-management/news-management/news-category/dialog-update/dialog-update.component';
import { NewsUpdateComponent } from './data-management/news-management/news-update/news-update.component';
import { DialogDeleteComponent } from './data-management/news-management/news-category/dialog-delete/dialog-delete.component';
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
    NewsTableComponent,
    NewsCategoryComponent,
    NewsInputComponent,
    AccountComponent,
    NewsDetailComponent,
    MainPageComponent,
    ChoiceDialogComponent,
    NotificationDialogComponent,
    DialogComponent,
    ErrorComponent,
    DialogAddComponent,
    RegisterComponent,
    DialogUpdateComponent,
    NewsUpdateComponent,
    DialogDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    StickyNavModule,
    HttpClientModule,
    SnotifyModule,
    CKEditorModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSelectModule,
    DemoMaterialModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [{provide:'SnotifyToastConfig', useValue: ToastDefaults },SnotifyService],
  bootstrap: [MainComponent]
})
export class AppModule { }
