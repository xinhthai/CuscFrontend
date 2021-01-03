import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { NewsInputComponent } from './data-management/news-management/news-input/news-input.component';
import { NewsTableComponent } from './data-management/news-management/news-table/news-table.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from '../app/data-management/account/login/login.component';
import { NewsCategoryComponent } from './data-management/news-management/news-category/news-category.component';
import { NewsDetailComponent } from './data-management/news-management/news-detail/news-detail.component';
import { MainPageComponent } from './data-management/news-management/main-page/main-page.component';
import { ErrorComponent } from './data-management/error/error.component';
import { RegisterComponent } from './data-management/account/register/register.component';
import { NewsUpdateComponent } from './data-management/news-management/news-update/news-update.component';
import { MainListNewsComponent } from './data-management/news-management/main-page/main-list-news/main-list-news.component';
import { MainNewsDetailComponent } from './data-management/news-management/main-page/main-news-detail/main-news-detail.component';
import { ListNewByMenuComponent } from './layouts/main-layout/navbar/list-new-by-menu/list-new-by-menu.component';
import { MenuComponent } from './data-management/admin/menu/menu.component';
import { CreateCalendarComponent } from './data-management/calendar/create-calendar/create-calendar.component';
import { ListCalendarComponent } from './data-management/calendar/list-calendar/list-calendar.component';
@NgModule({
  imports: [RouterModule.forRoot(
    [
      {
        path:'',
        component:HomeComponent,
        children:[
          {
            path:'home',
            component: MainPageComponent,
          },
          {
            path:'listnews/:id',
            component: MainListNewsComponent
          },
          {
            path:'newsdetail/:id',
            component: MainNewsDetailComponent
          },
          {
            path: 'educate/:id',
            component: ListNewByMenuComponent
          }
        ]
      },
      {
        path : '',
        redirectTo : 'home',
        pathMatch : 'full'
       },
      {
        path: '',
        children:[
          {
            path: 'login',
            component: LoginComponent
          },
          {
            path: 'admin',
            component: AdminHomeComponent,
            children:[
              {
                path: 'news',
                children:[
                  {
                    path: 'list-news',
                    component: NewsTableComponent
                  },
                  {
                    path: 'create-news',
                    component: NewsInputComponent
                  },
                  {
                    path: 'edit-news',
                    component: NewsUpdateComponent
                  },
                  {
                    path: 'detail/:id',
                    component: NewsDetailComponent
                  }
                ]
              },
              {
                path: 'category-news',
                component: NewsCategoryComponent
              },
              {
                path: 'menu-config',
                component: MenuComponent
              },
              {
                path: 'account',
                component: RegisterComponent,
                children: [
                  {
                    path: 'register',
                    component: RegisterComponent
                  }
                ]
              },
              {
                path: 'add-calendar',
                component: CreateCalendarComponent
              },
              {
                path: 'list-calendar',
                component: ListCalendarComponent
              },
            ]
          }
        ]
      },
      {
        path: '404',
        component: ErrorComponent
      },
      {
        path: '**',
        redirectTo: '/404'
      }

    ]
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
