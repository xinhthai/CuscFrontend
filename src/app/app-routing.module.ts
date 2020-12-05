import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { NewsInputComponent } from './data-management/news-input/news-input.component';
import { NewsTableComponent } from './data-management/news-table/news-table.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
@NgModule({
  imports: [RouterModule.forRoot(
    [
      {
        path: 'home',
        component:HomeComponent
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
            component: NewsTableComponent,
            children:[
              {
                path: 'add-news',
                component: NewsInputComponent
              },
            ]
          }
        ]
      }


    ]
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
