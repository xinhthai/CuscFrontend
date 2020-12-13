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
@NgModule({
  imports: [RouterModule.forRoot(
    [
      // {
      //   path: 'newchild',
      //   component: NewsDetailComponent
      // },
      // {
      //   path: 'home',
      //   component:HomeComponent
      // },
      {
        path:'',
        component:HomeComponent,
        children:[
          {
            path:'home',
            component: MainPageComponent,
          },
          {
            path:'detail/:id',
            component: NewsDetailComponent
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
                path: 'add-news',
                component: NewsInputComponent
              },
              {
                path: 'list-news',
                component: NewsTableComponent
              },
              {
                path: 'category-news',
                component: NewsCategoryComponent
              }
            ]
          }
        ]
      }


    ]
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
